import "./work-thumbnail.scss";
import HoverEffect from "../effects/hover-effect/hover-effect";
import CursorService from "../../services/cursor.service";
import IThumbnailWork from "../../interfaces/thumbnail-work.interface";

export interface WorkThumbnailProps {
  work: IThumbnailWork;  
}

export const CLASSES = {
  HOST: "work-thumbnail",
  TOOLTIP_NAME: "work-thumbnail-tooltip-name",
  FOCUS_WITHIN_DESCRIPTION: "work-within-description",
}

export default function WorkThumbnail({work}: WorkThumbnailProps) {

  const handleMouseEnter = () => {
    CursorService.instance.enter(getTooltip());
  }

  const handleMouseLeave = () => {
    CursorService.instance.leave();
  }

  const getTooltip = () => {
    return (
      <>
        <div>
          {work.period ? <p>{work.period}</p> : null}
          <h3>{work.name}</h3>
        </div>
        {work.client ? <p>For {work.client}</p> : work.company ? <p>For {work.company}</p> : null} 
      </>
    );
  }

  return (
    <button className={CLASSES.HOST} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <HoverEffect width="100%" height="100%">
        <div className={CLASSES.FOCUS_WITHIN_DESCRIPTION}>
          {getTooltip()}
        </div>
        <img src={work.thumbnail} alt=""/>
      </HoverEffect>
    </button> 
  );    
}