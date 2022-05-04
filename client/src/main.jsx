import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import { MainProvider } from './context/Main'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>
)
