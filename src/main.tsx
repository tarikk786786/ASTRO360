import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { GlobalConfigProvider } from './context/GlobalConfigContext.tsx';
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
