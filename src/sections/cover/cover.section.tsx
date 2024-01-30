import "./cover.section.scss";
import Button from "../../components/button/Button";
import ScrollService from "../../services/scroll.service";
import { ArrowDownToDot } from "lucide-react";
import DragAndDropContainer from "../../components/drag-and-drop/container/Drag-and-drop-container";
import HoverEffect from "../../components/effects/hover-effect/hover-effect";

import { useGSAP } from "@gsap/react";

import PROFILE_PICTURE from '../../assets/images/profile-picture.jpg';
import { CLASSES as GENERAL_CLASSES } from "../../assets/scripts/utils";
import { CLASSES as BUTTON_CLASSES } from "../../components/button/Button";
import { CLASSES as DRAG_AND_DROP_CLASSES } from "../../components/drag-and-drop/container/Drag-and-drop-container"; 
import gsap, { Back, Power3 } from "gsap";
import { useRef } from "react";

const IDS = {
  SECTION: 'cover-section',
  HEADLINE: 'cover-headline',
  SCROLL_INVITE: 'scroll-invite',
  HEY: 'hey'
}

const CLASSES = {
  WAVING_HAND: 'waving-hand',
  HIDDEN_TEXT: 'hidden-text',
  NTSY: 'ntsy'
}

export interface CoverSectionProps {
  nextSelector: string,
}

export default function CoverSection({nextSelector}: CoverSectionProps) {
  const container = useRef<HTMLElement>(null);
  const hey = useRef(null);

  useGSAP(() => {
    const wavingHand = container?.current?.querySelector(`.${GENERAL_CLASSES.EMOJI} > span`);

    gsap.timeline()
      .to(hey.current, { delay: .5, duration: .3, ease: Back.easeOut.config(4), opacity: 1, y: 0, rotate: 0  }, 'step-1')
      .to(`.${GENERAL_CLASSES.EMOJI} > span`, { delay: .6, duration: .4, ease: Back.easeOut.config(3), y: 0, onComplete: () => wavingHand?.classList.add(CLASSES.WAVING_HAND)}, 'step-1')
      .to(`.${CLASSES.NTSY}`, { delay: .8, duration: .3, stagger: .1, ease: Back.easeOut.config(3), opacity: 1, y: 0, rotate: 0}, 'step-1')
      //.to(`.${DRAG_AND_DROP_CLASSES.HOST}`, { delay: .4, duration: .4, ease: Back.easeOut.config(2), opacity: 1, y: 0 }, 'step-1')
      .to(`.${GENERAL_CLASSES.HEADLINE}`, { delay: .5, duration: .4, ease: Back.easeOut.config(2), opacity: 1, y: 0, rotate: 0 }, 'step-1')
      .to(`.${GENERAL_CLASSES.INDEX}`, { delay: .6, duration: .4, ease: Power3.easeInOut, opacity: 1, y: 0 }, 'step-1')
      .to(`.${BUTTON_CLASSES.HOST}`, { delay: .7, duration: .4, ease: Back.easeOut.config(2), opacity: 1, y: 0 }, 'step-1')
  }, { scope: container });

  return (
    <section id={IDS.SECTION} ref={container} >
      <div className={GENERAL_CLASSES.HEADLINE_CONTAINER}>
        <p className={GENERAL_CLASSES.INDEX} aria-hidden="true">dimitridrouet.com</p>
        {/* <DragAndDropContainer width="200px" height="200px" message="The picture was here" placeholderTooltip="Click to reset" targetTooltip="Drag me">
          <HoverEffect width="100%" height="100%" >
            <img src={PROFILE_PICTURE} alt=''/>
          </HoverEffect>
        </DragAndDropContainer> */}
        <h1 className={GENERAL_CLASSES.DISPLAY}>
          <span ref={hey} className={CLASSES.HIDDEN_TEXT}>Hey!</span>
          <span className={GENERAL_CLASSES.EMOJI} aria-hidden="true">
            <span>👋</span>
          </span>
          <span className={[CLASSES.HIDDEN_TEXT, CLASSES.NTSY].join(" ")}>Nice</span>
          <span className={[CLASSES.HIDDEN_TEXT, CLASSES.NTSY].join(" ")}>to</span>
          <span className={[CLASSES.HIDDEN_TEXT, CLASSES.NTSY].join(" ")}>see</span>
          <span className={[CLASSES.HIDDEN_TEXT, CLASSES.NTSY].join(" ")}>you!</span>
        </h1>
        {/* <p className={[GENERAL_CLASSES.HEADLINE, CLASSES.HIDDEN_TEXT].join(" ")}>
          Welcome to my website!
          I'm Dimitri, I'm a UI/UX Designer, Poladict, Podcasts Maker and Music Enthousiatic.
        </p> */}
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
}
