import "./home-page.scss"

import { CursorTriggerProps } from "../../assets/scripts/utils";
import BackgroundCircle from "../../components/background-shapes/background-circle/background-circle";
import Background from "../../components/background/background";
import ParallaxEffect from "../../components/effects/parallax-effect/parallax-effect";
import RotatorEffect from "../../components/effects/rotator-effect/rotator-effect";
import SelfRotatorEffect from "../../components/effects/self-rotator-effect/self-rotator-effect";
import DragAndDropContainer from "../../components/drag-and-drop/container/Drag-and-drop-container";
import Button from "../../components/button/Button";
import HoverEffect from "../../components/effects/hover-effect/hover-effect";
import PROFILE_PICTURE from '../../assets/images/profile-picture.jpg';
import WorkGrid from "../../components/project/work-grid/work-grid";
import { ArrowDownToDot } from "lucide-react";
import ScrollService from "../../services/scroll.service";

// export interface PageProps extends CursorTriggerProps {
//   scroll: Lenis;
// }

export function HomePageComponent({cursorRef}: CursorTriggerProps) {
  return (
    <>
      <section className="home-cover">
        <Background>
          <ParallaxEffect>
            <RotatorEffect>
              <SelfRotatorEffect>
                <BackgroundCircle />
              </SelfRotatorEffect>
            </RotatorEffect>
          </ParallaxEffect>

          <ParallaxEffect style={{position: "absolute", bottom: 0, right: 0}}>
            <RotatorEffect>
              <SelfRotatorEffect>
                <BackgroundCircle />
              </SelfRotatorEffect>
            </RotatorEffect>
          </ParallaxEffect>
        </Background>
          <div className="home-cover-headline-container">
            <p className="index">001/</p>
            <DragAndDropContainer width="200px" height="200px" message="The picture was here" cursorRef={cursorRef} placeholderTooltip="Click to reset" targetTooltip="Drag me">
              <HoverEffect width="100%" height="100%" >
                <img src={PROFILE_PICTURE} />
              </HoverEffect>
            </DragAndDropContainer>
            <h1 className="display-heading">Hey! <span className="emoji waving-hand">👋</span> Nice to see you!</h1>
            <p className="home-cover-headline">Welcome to my website! I'm Dimitri I'm a UI/UX Designer, Poladict, Podcasts Maker and Music Enthousiatic.</p>
          </div>
          <Button cursorRef={cursorRef} handleClick={() => ScrollService.instance.scrollTo('#work-grid')}>
            <span>Next</span>
            <ArrowDownToDot size={20} strokeWidth={2} />
          </Button>
          <div className="scroll-invite">
            <p>Scroll</p>
            <div className="scoll-invite-line"/>
          </div>
      </section>
      <section id="work-grid">
        <WorkGrid cursorRef={cursorRef}/>
      </section>
    </>
  );
}