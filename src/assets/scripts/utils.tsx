import { ReactNode, RefObject } from "react";
import { CursorControl } from "../../components/cursor/Cursor";

export const CLASSES = {
  BACKGROUND: "background",
  DISPLAY: "display",
  ACTIVE: "active",
  INDEX: "index",
  BACKGROUND_SHAPE: "background-shape",
  ONE_LINE: "one-line",
  SHOWABLE_TEXT: "showable-text",
  ACCESSIBILITY_TEXT: "accessibility-text"
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
}

export interface BackgroundShapeProps {
  width?: string;
  height?: string;
}

export interface EffectProps {
  children?: ReactNode;
  style?: React.CSSProperties;
}

export const DEFAULT_POSITION: Position = { x: 0, y: 0 }
