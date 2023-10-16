import { ReactNode, RefObject } from "react";
import { CursorControl } from "../cursor/Cursor";

export enum CursorStyle {
  POINTER= "pointer",
  GRAB= "grab",
  GRABBING= "grabbing"
}

export interface CursorTriggerProps {
  style?: CursorStyle;
  children?: ReactNode;
  cursorRef?: RefObject<CursorControl>;
  toolip?: ReactNode;
}

const CLASSES = {
  HOST: "cursor-trigger"
} 

export default function CursorTrigger({style = CursorStyle.POINTER, cursorRef, children, toolip}: CursorTriggerProps) {

  const handleEnter = () => cursorRef?.current?.open(toolip);
  const handleLeave = () => cursorRef?.current?.close();

  return (
    <div className={CLASSES.HOST} onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={{cursor: style}}>
      {children}
    </div>
  );
}