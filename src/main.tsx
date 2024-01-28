import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.scss'
import ScrollService from './services/scroll.service.ts'
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';

//Initialises lenis scroll;
ScrollService.instance;
gsap.registerPlugin(TextPlugin);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
)