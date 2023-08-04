import { ReactNode, RefObject } from "react";
import { CursorControl } from "../../component/cursor/Cursor";

export const CLASSES = {
  BACKGROUND: "background",
  HOVER_EFFECT: "hover-effect",
  ACTIVE_EFFECT: "active-effect"
}

export interface Position {
  x: number;
  y: number;
}

export interface Translation {
  x: number;
  y: number;
  z: number;
}

export interface CursorTriggerProps {
  cursorRef?: RefObject<CursorControl>;
  tooltip?: ReactNode;
  icon?: string;
}

export const DEFAULT_POSITION: Position = { x: 0, y: 0 }