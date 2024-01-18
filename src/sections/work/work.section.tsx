import { CLASSES as GENERAL_CLASSES } from "../../assets/scripts/utils";
import "./work.section.scss"

export const IDS = {
  SECTION: 'work-section',
  GRID: 'work-grid'
}

export interface WorkSectionProps {}

export default function WorkSection ({} : WorkSectionProps) {
  return (
    <section id={IDS.SECTION}>
      <p className={GENERAL_CLASSES.INDEX} aria-hidden="true">002/</p>
      <h2 id={IDS.GRID} className={GENERAL_CLASSES.DISPLAY}>Work</h2>
    </section>
  );
}