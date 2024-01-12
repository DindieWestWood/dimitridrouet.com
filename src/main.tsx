import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.scss'
import ScrollService from './services/scroll.service.tsx'

//Initialises lenis scroll;
ScrollService.instance;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)