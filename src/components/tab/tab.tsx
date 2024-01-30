import { ReactNode } from "react";
import "./tab.scss";
import { CLASSES as GENERAL_CLASSES } from "../../assets/scripts/utils";
import CursorService from "../../services/cursor.service";

export const CLASSES = {
  HOST: "tab",
  OVERLAY: "tab-overlay"
}

export interface TabProps {
  active?: boolean;
  panelId: string;
  children: ReactNode;
  onClick: () => void;
}

export default function Tab({active = false, panelId, children, onClick}: TabProps) {
  const classList = [CLASSES.HOST];

  if (active) classList.push(GENERAL_CLASSES.ACTIVE);

  const handleMouseEnter = () => {
    if (!active) {
      CursorService.instance.enter();
    }
  }

  const handleMouseOut = () => {
    if (!active) {
      CursorService.instance.leave();
    }
  }

  const handleClick = () => {
    if (!active) {
      CursorService.instance.leave();
      onClick();
    }

  }

  return (
    <button type="button" className={classList.join(" ")} role="tab" aria-selected={active} aria-controls={panelId} onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut} onClick={handleClick}>
      <div className={CLASSES.OVERLAY}>
        {children}
      </div>
      {children}
    </button>
  );
}