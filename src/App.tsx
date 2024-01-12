import "./App.scss";
import { useEffect, useRef } from "react";
import Cursor, { CursorControl } from "./component/cursor/Cursor";
import { ArrowDownToDot } from "lucide-react";
import ScrollService from "./services/scroll.service";
import Button from "./component/button/Button";

function App(){
  const cursorRef = useRef<CursorControl>(null);

  useEffect(() => {
    
  }, []);

  return (
    <>
      <main role="main">
        <section id="cover-section">
          <div>
            <p className="index" aria-hidden="true">001/</p>
            <h1 className="display">Hey! <span className="emoji waving-hand" aria-hidden="true">👋</span> Nice to see you!</h1>
            <p id="headline-description">Welcome to my website! I'm Dimitri I'm a UI/UX Designer, Poladict, Podcasts Maker and Music Enthousiatic.</p>
          </div>
          
          <Button cursorRef={cursorRef} handleClick={() => ScrollService.instance.scrollTo('#work-grid')}>
            <span>Next</span>
            <ArrowDownToDot size={20} strokeWidth={2} />
          </Button>

          <div id="scroll-invite" aria-hidden="true">
            <p>Scroll</p>
          </div>
        </section>
        <section id="projects-section">
          <p className="index" aria-hidden="true">002/</p>
          <h2 id="work-grid" className="display">Projects</h2>
        </section>
      </main>
      <Cursor ref={cursorRef}/>
    </>
  )
}

export default App
