import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.scss'
import ScrollService from './services/scroll.service.ts'

//Initialises lenis scroll;
ScrollService.instance;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
)