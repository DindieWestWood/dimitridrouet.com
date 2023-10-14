import { CLASSES as GENERAL_CLASSES } from "../../../assets/scripts/utils";
import "./project-selector.scss";

export interface ProjectSelectorProps {
  label: string,
  active: boolean,
  projectCount?: number
}

const CLASSES = {
  CONTAINER: "prj-sel-container"
}

export default function ProjectSelector({label, active = false, projectCount}: ProjectSelectorProps) {
  
  return (
    <div className={`${CLASSES.CONTAINER} ${active? GENERAL_CLASSES.ACTIVE : ''}`}>
      <h3>{label}</h3>
      <p className={GENERAL_CLASSES.INDEX}>[{projectCount}]</p>
    </div>
  );
}