import CursorService from "../../../services/cursor.service";
import "./cursor-trigger.scss";
import { ReactNode, RefObject } from "react";

export enum CursorStyle {
  POINTER= "pointer",
  GRAB= "grab",
  GRABBING= "grabbing"
}

export interface CursorTriggerProps {
  style?: CursorStyle;
  children?: ReactNode;
  toolip?: ReactNode;
}

const CLASSES = {
  HOST: "cursor-trigger"
} 

export default function CursorTrigger({style = CursorStyle.POINTER, children, toolip}: CursorTriggerProps) {
  const handleEnter = () => CursorService.instance.enter(toolip);
  const handleLeave = () => CursorService.instance.leave();

  return (
    <div className={CLASSES.HOST} onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={{cursor: style}}>
      {children}
    </div>
  );
}