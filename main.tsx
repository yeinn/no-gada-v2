import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import './index.css';
import Home from './pages/Home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" />
    <Home />
  </StrictMode>
);
