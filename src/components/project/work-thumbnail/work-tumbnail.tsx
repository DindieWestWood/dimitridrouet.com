import { RefObject } from "react";
import CursorTrigger from "../../cursor/cursor-trigger/cursor-trigger";
import "./work-thumbnail.scss";
import { CursorControl } from "../../cursor/Cursor";
import HoverEffect from "../../effects/hover-effect/hover-effect";

export interface WorkThumbnailProps {
  cursorRef?: RefObject<CursorControl>;
  name: string,
  period?: string,
  client?: string
}

export const CLASSES = {
  HOST: "work-thumbnail",
  TOOLTIP_NAME: "work-thumbnail-tooltip-name"
}

export default function WorkThumbnail({cursorRef, name, period, client}: WorkThumbnailProps) {
  return (
    <CursorTrigger cursorRef={cursorRef} toolip={<>
      <div>
        {period ? <p>{period}</p> : null}
        <h3>{name}</h3>
      </div>
      {client ? <p>For {client}</p> : null} 
    </>}>
      <div className={CLASSES.HOST}>
        <HoverEffect width="100%" height="100%">

        </HoverEffect>
      </div>
        
    </CursorTrigger>
  );
}