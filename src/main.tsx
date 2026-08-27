import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { GlobalConfigProvider } from './context/GlobalConfigContext';
import { AudioProvider } from './context/AudioContext';
import { NotificationProvider } from './context/NotificationContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <GlobalConfigProvider>
        <AudioProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </AudioProvider>
      </GlobalConfigProvider>
    </ErrorBoundary>
  </StrictMode>,
);
