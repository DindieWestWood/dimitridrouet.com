import { CLASSES as GENERAL_CLASSES } from "../../../assets/scripts/utils";
import CursorTrigger, { CursorTriggerProps } from "../../cursor/cursor-trigger/cursor-trigger";
import "./work-category-selector.scss";

export interface WorkCategorySelectorProps extends CursorTriggerProps {
  id: string,
  label: string,
  active: boolean,
  projectCount?: string,
  onClick?: () => void
}

const CLASSES = {
  HOST: "work-category-selector"
}

export default function WorkCategorySelector({cursorRef, label, active = false, projectCount, onClick}: WorkCategorySelectorProps) {
  
  const handleOnClick = () => {
    if (onClick) onClick();
  }

  return (
    <CursorTrigger cursorRef={cursorRef}>
      <div className={`${CLASSES.HOST} ${active? GENERAL_CLASSES.ACTIVE : ''}`} onClick={handleOnClick}>
        <h3>{label}</h3>
        <p className={GENERAL_CLASSES.INDEX}>[{projectCount}]</p>
      </div>
    </CursorTrigger>
  );
}