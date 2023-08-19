import { useRef } from "react";
import Cursor, { CursorControl } from "./component/cursor/Cursor";
import { HomePageComponent } from "./pages/home-page";

function App() {
  const cursorRef = useRef<CursorControl>(null);

  return (
    <>
      <HomePageComponent cursorRef={cursorRef}/>
      <Cursor ref={cursorRef}/>
    </>
  )
}

export default App
