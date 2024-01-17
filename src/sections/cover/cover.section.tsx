import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import "./cover.section.scss";
import Button from "../../components/button/Button";
import ScrollService from "../../services/scroll.service";
import { ArrowDownToDot } from "lucide-react";

const IDS = {
  SECTION: 'cover-section'
}

export interface CoverSectionControls {
  show: () => void
}

export interface CoverSectionProps {}

const CoverSection = forwardRef<CoverSectionControls, CoverSectionProps>(({}: CoverSectionProps, ref: ForwardedRef<CoverSectionControls>) => {
  useImperativeHandle(ref, () => ({
    show: show
  }));

  const show = () => {
    
  }

  return (
    <section id="cover-section">
      <div>
        <p className="index" aria-hidden="true">001/</p>
        <h1 className="display">Hey! <span className="emoji waving-hand" aria-hidden="true">👋</span> Nice to see you!</h1>
        <p id="headline-description">Welcome to my website! I'm Dimitri I'm a UI/UX Designer, Poladict, Podcasts Maker and Music Enthousiatic.</p>
      </div>
  
      <Button handleClick={() => ScrollService.instance.scrollTo('#work-grid')}>
        <span>Next</span>
        <ArrowDownToDot size={20} strokeWidth={2} />
      </Button>

      <div id="scroll-invite" aria-hidden="true">
        <p>Scroll</p>
      </div>
    </section>
  );
});

export default CoverSection

{/*  */}