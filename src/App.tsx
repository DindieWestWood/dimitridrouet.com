import { useRef } from "react";
import Button from "./component/button/Button";
import Cursor, { CursorControl } from "./component/cursor/Cursor";
import BackgroundCircle from "./component/background-circle/background-circle";
import RotatorEffect from "./component/rotator-effect/rotator-effect";
import ParallaxEffect from "./component/parallax-effect/parallax-effect";

function App() {
  const cursorRef = useRef<CursorControl>(null);

  return (
    <>
      <section/>
      <section>
        <ParallaxEffect>
          <RotatorEffect>
            <BackgroundCircle />
          </RotatorEffect>
        </ParallaxEffect>
        {/*<Button cursorRef={cursorRef} tooltip="Tooltip">With Tooltip Bitch !</Button> */}
      </section>
      <section/>
      <Cursor ref={cursorRef}/>
    </>
  )
}

export default App
