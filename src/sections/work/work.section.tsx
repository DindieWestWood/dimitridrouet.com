import { CLASSES as GENERAL_CLASSES } from "../../assets/scripts/utils";
import WorkGrid from "../../components/work-grid/work-grid";
import IWork from "../../interfaces/work.interface";
import "./work.section.scss"

export const IDS = {
  SECTION: 'work-section',
  GRID: 'work-grid'
}

export interface WorkSectionProps {
  workList: IWork[];
}

export default function WorkSection ({workList} : WorkSectionProps) {
  const ID = 'work-grid';

  return (
    <section id={IDS.SECTION}>
      <p className={GENERAL_CLASSES.INDEX} aria-hidden='true'>002/</p>
      <h2 id={`${ID}-label`} className={GENERAL_CLASSES.DISPLAY}>Work</h2>
      <WorkGrid id={ID} workList={workList}/>
    </section>
  );
}