import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TimerProvider } from './Context';
import { Analytics } from '@vercel/analytics/react';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TimerProvider>
      <App />
      <Analytics />
    </TimerProvider>
  </StrictMode>,
);
