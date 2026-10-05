import React, { Suspense, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Lazy load the dedicated client intake page to preserve fast bundle size
const ClientIntake = React.lazy(() => import('./pages/ClientIntake'));
const INTAKE_ROUTES = ['/client-intake', '/domain-onboarding'];

const RootRouter: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => 
    window.location.pathname.replace(/\/+$/, '').toLowerCase()
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname.replace(/\/+$/, '').toLowerCase());
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const isIntake = INTAKE_ROUTES.includes(currentPath);

  if (isIntake) {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#0b0d13] flex items-center justify-center text-slate-400 font-mono text-xs">
          Loading onboarding portal...
        </div>
      }>
        <ClientIntake />
      </Suspense>
    );
  }

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>
);
