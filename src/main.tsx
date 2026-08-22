import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './components/ErrorBoundary';
import { GlobalConfigProvider } from './context/GlobalConfigContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <GlobalConfigProvider>
        <App />
      </GlobalConfigProvider>
    </ErrorBoundary>
  </StrictMode>,
);
