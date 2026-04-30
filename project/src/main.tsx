import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App.tsx';
import ComingSoonPage from './pages/ComingSoonPage.tsx';
import './index.css';

// Best-effort protection: reduce casual downloading of media assets.
const enableMediaProtection = () => {
  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  document.addEventListener('dragstart', (event) => {
    const target = event.target as HTMLElement | null;
    if (target?.closest('img, video')) {
      event.preventDefault();
    }
  });

  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    const isSaveShortcut = (event.ctrlKey || event.metaKey) && key === 's';
    const isViewSourceShortcut = (event.ctrlKey || event.metaKey) && key === 'u';
    const isDevToolsShortcut = key === 'f12' || ((event.ctrlKey || event.metaKey) && event.shiftKey && key === 'i');

    if (isSaveShortcut || isViewSourceShortcut || isDevToolsShortcut) {
      event.preventDefault();
    }
  });
};

enableMediaProtection();

const comingSoonFlag = String(import.meta.env.VITE_COMING_SOON ?? '').toLowerCase();
const comingSoonEnabled = comingSoonFlag === 'true' || (import.meta.env.PROD && comingSoonFlag !== 'false');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {comingSoonEnabled ? (
      <ComingSoonPage />
    ) : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
    <SpeedInsights />
  </StrictMode>
);