import { useRef } from "react";
import Button from "./component/button/Button";
import Cursor, { CursorControl } from "./component/cursor/Cursor";
import BackgroundCircle from "./component/background-circle/background-circle";
import RotatorEffect from "./component/rotator-effect/rotator-effect";

function App() {
  const cursorRef = useRef<CursorControl>(null);

  return (
    <>
      <RotatorEffect>
        <BackgroundCircle />
      </RotatorEffect>
      <Cursor ref={cursorRef}/>
      {/* <Button cursorRef={cursorRef} tooltip="Tooltip">With Tooltip Bitch !</Button> */}
    </>
  )
}

export default App
