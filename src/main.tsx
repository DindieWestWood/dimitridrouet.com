import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.scss'
import Lenis from '@studio-freight/lenis'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const lenis = new Lenis();

lenis.on('scroll', (e: any) => {
  console.log(e)
})

function raf(time: any) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)