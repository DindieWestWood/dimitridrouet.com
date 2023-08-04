import { useRef } from "react"
import AnimatedBackground from "./component/animated-background/AnimatedBackground"
import Button from "./component/button/Button"
import Cursor, { CursorControl } from "./component/cursor/Cursor"

function App() {
  const cursorRef = useRef<CursorControl>(null);

  return (
    <>
      <AnimatedBackground />
      <Cursor ref={cursorRef}/>
      <Button cursorRef={cursorRef} tooltip="Tooltip">With Tooltip Bitch !</Button>
    </>
  )
}

export default App
