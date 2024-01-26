import "./work-grid.scss";
import { RefObject, useEffect, useRef, useState } from "react";
import { CursorControl } from "../../cursor/Cursor";
import WorkCategorySelector from "../work-category-selector/work-category-selector";
import { gsap, Power3 } from "gsap";
import WorkThumbnail, { CLASSES as WORK_THUMBNAIL_CLASSES } from "../../work-thumbnail/work-tumbnail";
import worksData from "../../../assets/jsons/works.json";


export interface WorkGridProps {
  cursorRef?: RefObject<CursorControl>;
}

export interface WorkCategory {
  id: string,
  label: string,
  description: string
}

export interface Work {
  id: string,
  categoryId: string,
  title: string,
  description: string[],
  period: string,
  client?: string,
  company?: string,
  roles: string []
}

export const CLASSES = {
  HOST: "work-grid",
  CATEGORIES: "work-categories"
}

const WORK_CATEGORIES: WorkCategory[] = [
  { id: "projects", label: "Projects", description: "A selection of personal and professional projects, I made all along my career." },
  { id: "lab", label: "Lab", description: "A selection of personal experimentations and side projects." }
]

export default function WorkGrid({cursorRef}: WorkGridProps) {
  const [workCategory, setWorkCategory] = useState<WorkCategory>(WORK_CATEGORIES[0]);
  const [works, setWorks] = useState<Work[]>([]);
  const selectorsRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setWorks(JSON.parse(JSON.stringify(worksData)));
  }, []);

  const getWorkCategoryFromId = (id: string) => {
    const newWorkCategory = WORK_CATEGORIES.find(wc => wc.id === id);
    return newWorkCategory ? newWorkCategory : WORK_CATEGORIES[0];
  }

  const handleWorkCategorySelectorClick = (id: string) => {
    if (id !== workCategory?.id) {
      gsap.timeline()
        .set(selectorsRef?.current, { pointerEvents: "none" })
        .to(selectorsRef?.current, { duration: .8, ease: Power3.easeInOut, opacity: .5 }, "step1")
        .to(`.${WORK_THUMBNAIL_CLASSES.HOST}`, { duration: .4, ease: Power3.easeIn, y: "1rem", opacity: 0 }, "step1")
        .to(descriptionRef?.current, { duration: .4, delay: .1, ease: Power3.easeIn, y: "1rem", opacity: 0 }, "step1")
        .call(() => setWorkCategory(getWorkCategoryFromId(id)))
        .to(selectorsRef?.current, { duration: .8, ease: Power3.easeInOut, opacity: 1 }, "step2")
        .to(descriptionRef?.current, { duration: .4, delay: .2, ease: Power3.easeInOut, y: "0rem", opacity: 1 }, "step2")
        .to(`.${WORK_THUMBNAIL_CLASSES.HOST}`, { duration: .4, delay: .3, ease: Power3.easeInOut, y: "0rem", opacity: 1 }, "step2")
        .set(selectorsRef?.current, { pointerEvents: "inherit" });
    }
  } 

  const getProjectCount = (workCategoryId: string) => {
    const count = works?.filter(work => work.categoryId === workCategoryId)?.length;
    //console.log(count, workCategoryId, works);
    return count && count > 0 ? `${count}` : '?';
  } 

  const workCategorieSelectors = WORK_CATEGORIES.map(wc => 
    <WorkCategorySelector key={wc.id} id={wc.id} cursorRef={cursorRef} label={wc.label} projectCount={getProjectCount(wc.id)}
      active={wc.id === workCategory?.id} onClick={() => handleWorkCategorySelectorClick(wc.id)}/>);

  const workThumbnails = works.filter(work => work.categoryId === workCategory?.id).map(work =>
    <WorkThumbnail key={work.id} cursorRef={cursorRef} name={work.title} period={work.period} client={work.client}/>);

  return (
    <div className={CLASSES.HOST}>
      <div className={CLASSES.CATEGORIES}>
        <div ref={selectorsRef}>{ workCategorieSelectors }</div>
        <p ref={descriptionRef}>{workCategory?.description}</p>
      </div>
      {workThumbnails}
    </div>
  );
}