import { ReactNode, RefObject } from "react";

export const CLASSES = {
  ACCESSIBILITY_TEXT: 'accessibility-text',
  ACTIVE: 'active',
  BACKGROUND: 'background',
  BACKGROUND_SHAPE: 'background-shape',
  DISPLAY: 'display',
  EMOJI: 'emoji',
  HEADLINE_CONTAINER: 'headline-container',
  HEADLINE: 'headline',
  INDEX: 'index',
  ONE_LINE: 'one-line',
  HIDDEN: 'hidden',
  HIDDEN_TEXT: 'hidden-text'
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
