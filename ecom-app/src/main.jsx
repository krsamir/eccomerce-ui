import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({/* ... */});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;