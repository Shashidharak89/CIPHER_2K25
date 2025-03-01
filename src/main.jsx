import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App.jsx';
import { SampleState } from './components/contexts/SampleState.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Wrap App inside BrowserRouter */}
      <SampleState>
        <App />
      </SampleState>
    </BrowserRouter>
  </StrictMode>,
);
