import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import "./cover.section.scss";
import Button from "../../components/button/Button";
import ScrollService from "../../services/scroll.service";
import { ArrowDownToDot } from "lucide-react";
import DragAndDropContainer from "../../components/drag-and-drop/container/Drag-and-drop-container";
import HoverEffect from "../../components/effects/hover-effect/hover-effect";

import PROFILE_PICTURE from '../../assets/images/profile-picture.jpg';
import { CLASSES as GENERAL_CLASSES } from "../../assets/scripts/utils";

const IDS = {
  SECTION: 'cover-section',
  HEADLINE: 'cover-headline',
  SCROLL_INVITE: 'scroll-invite'
}

const CLASSES = {
  WAVING_HAND: 'waving-hand'
}

export interface CoverSectionControls {
  show: () => void
}

export interface CoverSectionProps {
  nextSelector: string,
}

const CoverSection = forwardRef<CoverSectionControls, CoverSectionProps>(({nextSelector}: CoverSectionProps, ref: ForwardedRef<CoverSectionControls>) => {
  useImperativeHandle(ref, () => ({
    show: show
  }));

  const show = () => {
    
  }

  return (
    <section id={IDS.SECTION}>
      <div id={IDS.HEADLINE}>
        <p className={GENERAL_CLASSES.INDEX} aria-hidden="true">001/</p>
        <DragAndDropContainer width="200px" height="200px" message="The picture was here" placeholderTooltip="Click to reset" targetTooltip="Drag me">
          <HoverEffect width="100%" height="100%" >
            <img src={PROFILE_PICTURE} alt=''/>
          </HoverEffect>
        </DragAndDropContainer>
        <h1 className={GENERAL_CLASSES.DISPLAY}>Hey! <span className={[GENERAL_CLASSES.EMOJI, CLASSES.WAVING_HAND].join(" ")} aria-hidden="true">👋</span> Nice to see you!</h1>
        <p className={GENERAL_CLASSES.HEADLINE_DESCRIPTION}>Welcome to my website! I'm Dimitri I'm a UI/UX Designer, Poladict, Podcasts Maker and Music Enthousiatic.</p>
      </div>
  
      <Button onClick={() => ScrollService.instance.scrollTo(nextSelector)}>
        <span>Next</span>
        <ArrowDownToDot size={20} strokeWidth={2} />
      </Button>

      <div id={IDS.SCROLL_INVITE} aria-hidden="true">
        <p>Scroll</p>
      </div>
    </section>
  );
});

export default CoverSection

{/*  */}