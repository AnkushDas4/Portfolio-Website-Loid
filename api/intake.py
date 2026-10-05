import json
import os
import re
import smtplib
import sys
from email.header import Header
from email.mime.text import MIMEText
from http.server import BaseHTTPRequestHandler

MAX_BODY_BYTES = 20_000
EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]{2,}$')
REQUIRED = ('name', 'email', 'phone', 'cityState', 'brandName', 'primaryDomain', 'description')


def _one_line(value, limit=200):
    """Strip control characters / newlines so user input can never inject mail headers."""
    return re.sub(r'[\r\n\t]+', ' ', str(value or '')).strip()[:limit]


class handler(BaseHTTPRequestHandler):
    def _reply(self, status, payload):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(json.dumps(payload).encode('utf-8'))

    def do_GET(self):
        self._reply(405, {'status': 'error', 'message': 'Method not allowed.'})

    def do_POST(self):
        try:
            length = int(self.headers.get('Content-Length', 0))
            if length <= 0:
                return self._reply(400, {'status': 'error', 'message': 'Empty request.'})
            if length > MAX_BODY_BYTES:
                return self._reply(413, {'status': 'error', 'message': 'Submission is too large.'})

            data = json.loads(self.rfile.read(length).decode('utf-8'))

            # Honeypot: bots fill the hidden field. Pretend it worked.
            if data.get('company_website'):
                return self._reply(200, {'status': 'success'})

            if data.get('fullName') and not data.get('name'):
                data['name'] = data['fullName']
            missing = [k for k in REQUIRED if not str(data.get(k, '')).strip()]
            if missing:
                return self._reply(400, {'status': 'error', 'message': 'Please complete all required fields.'})
            if not EMAIL_RE.match(str(data['email']).strip()):
                return self._reply(400, {'status': 'error', 'message': 'Please enter a valid email address.'})

            smtp_user = 'loid.sednium@gmail.com'
            smtp_pass = os.environ.get('SMTP_PASS') or os.environ.get('GMAIL_APP_PASS')
            target_to = os.environ.get('INTAKE_TO', 'loid@sednium.com')
            if not smtp_pass:
                print('intake: SMTP_PASS is not configured', file=sys.stderr)
                return self._reply(500, {'status': 'error', 'message': 'Our form is temporarily unavailable. Please email us directly.'})

            ref = _one_line(data.get('refId'), 30) or 'N/A'
            digits = re.sub(r'\D', '', str(data.get('phone', '')))
            subject = f"[Domain Intake] {_one_line(data.get('brandName'), 80)}: {_one_line(data.get('primaryDomain'), 80)} ({ref})"
            summary = str(data.get('message') or '').strip()[:8000]

            body = (
                f"New client intake via the portfolio site.\n\n"
                f"Reference: {ref}\n"
                f"WhatsApp: https://wa.me/{digits}\n"
                f"Reply-To is set to the client's email.\n\n"
                f"{summary}\n"
            )

            msg = MIMEText(body, 'plain', 'utf-8')
            msg['Subject'] = Header(subject, 'utf-8')
            msg['From'] = smtp_user
            msg['To'] = target_to
            msg['Reply-To'] = _one_line(data['email'], 254)

            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, [target_to], msg.as_string())

            return self._reply(200, {'status': 'success', 'message': 'Intake received.'})

        except (ValueError, json.JSONDecodeError):
            return self._reply(400, {'status': 'error', 'message': 'Invalid request.'})
        except Exception as exc:  # never leak internals to the browser
            print(f'intake: send failed: {exc!r}', file=sys.stderr)
            return self._reply(500, {'status': 'error', 'message': 'We could not send your details just now. Please try again.'})
