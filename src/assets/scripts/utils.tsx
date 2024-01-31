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

export const COLORS = {
  MAIN_500: '#6C5BF9',
  DARK_PRIMARY_TEXT: '#000000cf'
}

export const SHADOW = {
  NONE: '0 0 #0000',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  EXTRA_LARGE: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
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
