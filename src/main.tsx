import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// The client intake form lives on its own routes and is loaded on demand,
// so it adds nothing to the portfolio's initial bundle.
const ClientIntake = React.lazy(() => import('./pages/ClientIntake'));
const INTAKE_ROUTES = ['/client-intake', '/domain-onboarding'];

const path = window.location.pathname.replace(/\/+$/, '').toLowerCase();
const isIntake = INTAKE_ROUTES.includes(path);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {isIntake ? (
      <Suspense fallback={null}>
        <ClientIntake />
      </Suspense>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
