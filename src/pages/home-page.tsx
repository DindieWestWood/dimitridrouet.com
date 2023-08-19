import { ReactNode } from "react";

import { CursorTriggerProps } from "../assets/scripts/utils";
import BackgroundCircle from "../component/background-shapes/background-circle/background-circle";
import Background from "../component/background/background";
import ParallaxEffect from "../component/effects/parallax-effect/parallax-effect";
import RotatorEffect from "../component/effects/rotator-effect/rotator-effect";
import SelfRotatorEffect from "../component/effects/self-rotator-effect/self-rotator-effect";
import DragAndDropContainer from "../component/drag-and-drop/container/Drag-and-drop-container";
import Button from "../component/button/Button";

export interface PageProps extends CursorTriggerProps {}

export function HomePageComponent({cursorRef}: PageProps) {
  return (
    <>
      <Background>
        <ParallaxEffect>
          <RotatorEffect>
            <SelfRotatorEffect>
              <BackgroundCircle />
            </SelfRotatorEffect>
          </RotatorEffect>
        </ParallaxEffect>
      </Background>
      <section>
        <div className="cover">
          <div className="cover-title">
            <p className="index">01/</p>
            <DragAndDropContainer width="200px" height="200px" message="The picture was here" cursorRef={cursorRef}/>
            <h1>Dimitri Drouet</h1>
            <h2>Freelance, UX/UI Designer and Developer based in Rennes</h2>
          </div>
          <Button cursorRef={cursorRef}>Next</Button>
        </div>
      </section>
      <section/>
      <section/>
    </>
  );
}