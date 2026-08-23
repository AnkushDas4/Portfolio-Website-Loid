import json
import os
import smtplib
from email.mime.text import MIMEText
from email.header import Header
from http.server import BaseHTTPRequestHandler


class handler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, X-CSRF-Token, X-Requested-With, Accept, Authorization')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self.send_response(400)
                self._send_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "error",
                    "message": "Empty request body."
                }).encode('utf-8'))
                return

            body = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(body)

            name = data.get('name', '').strip()
            sender_email = data.get('email', '').strip()
            subject = data.get('subject', '').strip()
            payload = data.get('payload', '') or data.get('message', '')

            if not name or not sender_email or not payload:
                self.send_response(400)
                self._send_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "error",
                    "message": "Missing required fields: name, email, and payload/message are required."
                }).encode('utf-8'))
                return

            # SMTP Configuration for Gmail
            smtp_user = 'loid.sednium@gmail.com'
            smtp_pass = os.environ.get('SMTP_PASS') or os.environ.get('GMAIL_APP_PASS')
            target_to = 'loid@sednium.com'

            if not smtp_pass:
                self.send_response(500)
                self._send_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "error",
                    "message": "SMTP_PASS environment variable is not configured on the server."
                }).encode('utf-8'))
                return

            # Format email body
            email_subject = f"[Portfolio Contact] {subject}" if subject else f"[Portfolio Contact] Message from {name}"
            email_body = (
                f"New Transmission received via portfolio contact form:\n\n"
                f"Name: {name}\n"
                f"Email: {sender_email}\n"
                f"Subject: {subject if subject else 'N/A'}\n\n"
                f"--- Message Payload ---\n"
                f"{payload}\n\n"
                f"-----------------------\n"
                f"Sender IP / Source: Vercel Serverless Gateway"
            )

            # Build MIMEText message
            msg = MIMEText(email_body, 'plain', 'utf-8')
            msg['Subject'] = Header(email_subject, 'utf-8')
            msg['From'] = smtp_user
            msg['To'] = target_to
            msg['Reply-To'] = sender_email

            # Dispatch email via smtplib SSL (port 465)
            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, [target_to], msg.as_string())

            # Return success response
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "success",
                "message": "Message dispatched successfully."
            }).encode('utf-8'))

        except Exception as e:
            self.send_response(500)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "status": "error",
                "message": str(e)
            }).encode('utf-8'))
