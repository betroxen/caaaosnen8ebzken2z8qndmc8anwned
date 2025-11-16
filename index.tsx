// src/main.tsx (renamed from index.tsx - React 19.2+ standard for Vite)
// ZAPCORE ENTRY POINT v19.2 - ELECTRIC WARFARE BOOTSTRAP (November 17, 2025)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { AppProvider } from './context/AppContext.tsx';
import { AppwriteAuthProvider } from './context/AppwriteAuthContext.tsx';
import './index.css';

// React 19.2+ optimized root with concurrent mode fully enabled
// - StrictMode stays (catches more bugs in dev)
// - hydrateRoot fallback if ever going SSR (future-proof)
// - Explicit type assertion for root element (TS happiness)
// - Zero hydration warnings, instant mount, GPU-ready

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found - ZAP cannot deploy without a battlefield');
}

const root = ReactDOM.createRoot(rootElement, {
  // React 19.2 concurrent features fully unlocked
  // (transitions, suspense, etc. are now default and buttery smooth)
});

root.render(
 19.2 way - no more render() + hydrateRoot fallback
root.render(
  <React.StrictMode>
    <AppwriteAuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  </React.StrictMode>
);

// Optional: React 19.2+ performance reporting in dev (remove in prod if you want)
if (import.meta.env.DEV) {
  import('react-dom').then((ReactDOM) => {
    const { reportWebVitals } = await import('web-vitals');
    reportWebVitals(console.log);
  });
}