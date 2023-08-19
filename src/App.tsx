import { useRef } from "react";
import Button from "./component/button/Button";
import Cursor, { CursorControl } from "./component/cursor/Cursor";
import BackgroundCircle from "./component/background-circle/background-circle";
import RotatorEffect from "./component/rotator-effect/rotator-effect";
import ParallaxEffect from "./component/parallax-effect/parallax-effect";
import Background from "./component/background/background";
import DragAndDropContainer from "./component/drag-and-drop/container/drag-and-drop-container";

function App() {
  const cursorRef = useRef<CursorControl>(null);

  return (
    <>
      <Background>
        <ParallaxEffect>
          <RotatorEffect>
            <BackgroundCircle />
          </RotatorEffect>
        </ParallaxEffect>
      </Background>
      <section>
        <div className="cover">
          <div className="cover-title">
            <p className="index">01/</p>
            <DragAndDropContainer width="200px" height="200px"
                                  message="The picture was here"
                                  cursorRef={cursorRef}/>
                                  {/* placeholderTooltip="Click to bring back the picture"
                                  targetTooltip="Move me"/> */}
            <h1>Dimitri Drouet</h1>
            <h2>Freelance, UX/UI Designer and Developer based in Rennes</h2>
          </div>
          <Button cursorRef={cursorRef}>Next</Button>
        </div>
      </section>
      <section>
        
      </section>
      <section/>
      <Cursor ref={cursorRef}/>
    </>
  )
}

export default App
