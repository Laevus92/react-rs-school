import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div className="error">
          {`Nice, you've just broken the app. \n Please, reload the page!`}
        </div>
      }
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
