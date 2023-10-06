import { ReactNode } from "react";
import "./home-page.scss"

import { CursorTriggerProps } from "../../assets/scripts/utils";
import BackgroundCircle from "../../component/background-shapes/background-circle/background-circle";
import Background from "../../component/background/background";
import ParallaxEffect from "../../component/effects/parallax-effect/parallax-effect";
import RotatorEffect from "../../component/effects/rotator-effect/rotator-effect";
import SelfRotatorEffect from "../../component/effects/self-rotator-effect/self-rotator-effect";
import DragAndDropContainer from "../../component/drag-and-drop/container/Drag-and-drop-container";
import Button from "../../component/button/Button";
import HoverEffect from "../../component/effects/hover-effect/hover-effect";
import PROFILE_PICTURE from '../../assets/images/profile-picture.jpg';
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
      <section className="home-cover">
          <div className="home-cover-headlines">
            <p className="index">001/</p>
            <DragAndDropContainer width="200px" height="200px" message="The picture was here" cursorRef={cursorRef}>
              <HoverEffect width="100%" height="100%" >
                <img src={PROFILE_PICTURE} />
              </HoverEffect>
            </DragAndDropContainer>
            <h1>Dimitri Drouet</h1>
            <h2>UX/UI Designer and Developer based in Rennes</h2>
          </div>
          <Button cursorRef={cursorRef}>Next</Button>
      </section>
      <section className="home-work">
          <div className="project-grid">
            <div className="home-description">
              <div>
                <p className="index">002/</p>
                <h3>Work</h3>
              </div>
              <p>6+ years of experience in the field of UX and UI working inside different organisations for various clients. I’m currently working as a freelance.</p>
              <Button cursorRef={cursorRef}>See all project</Button>
            </div>
          </div>
      </section>
      <section/>
    </>
  );
}