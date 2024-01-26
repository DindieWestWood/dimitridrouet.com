import IWork from '../../interfaces/work.interface'
import './work-grid.scss'
import { CLASSES as GENERAL_CLASSES } from '../../assets/scripts/utils';
import { WorkTypeEnum, workTypeToDescription } from '../../enums/work-type.enum';
import { KeyboardEvent, ReactNode, useRef, useState } from 'react';
import CursorService from '../../services/cursor.service';
import gsap, { Power3 } from 'gsap';
import WorkThumbnail from '../work-thumbnail/work-tumbnail';

export const CLASSES = {
  GRID: 'work-grid',
  INNER_GRID: 'work-inner-grid',
  INNER_GRID_EMPTY_SPACE: 'work-inner-grid-empty-space',
  HEADER: 'work-grid-header',
  CATEGORY_SELECTORS: 'work-category-selectors',
  CATEGORY_SELECTOR: 'work-category-selector',
}

export interface WorkGridProps {
  id?: string;
  workList: IWork[];
}

export default function WorkGrid({id, workList}: WorkGridProps) {
  const selectedTypeRef = useRef<WorkTypeEnum>(WorkTypeEnum.PROJECT);
  const [selectedType, setSelectedType] = useState<WorkTypeEnum>(WorkTypeEnum.PROJECT);
  const [description, setDescription] = useState<string>(workTypeToDescription(WorkTypeEnum.PROJECT));
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const isShiftKeyDownRef = useRef<boolean>(false); 

  const getWorkCount = (type: WorkTypeEnum) => {
    return workList.reduce((count, current) => 
      current.type === type ? count + 1 : count, 0);
  }

  const getCategorySelectors = () => {
    const categorySelectors: ReactNode[] = [];

    for (const [key, value] of Object.entries(WorkTypeEnum)) {
      categorySelectors.push(
        <button key={`${id}-selector-${value}`} id={`${id}-selector-${value}`} className={CLASSES.CATEGORY_SELECTOR} role="tab"
                aria-selected={value === selectedType} aria-controls={`${id}-${value}-pannel`}
                onClick={() => handleCategorySelectorChange(value)}
                onMouseEnter={handleCategorySelectorMouseEnter}
                onMouseLeave={handleCategorySelectorMouseLeave}>
          {key}<span className={GENERAL_CLASSES.INDEX}>[{getWorkCount(value)}]</span>
        </button>
      );
    }

    return categorySelectors;
  }

  const getCategoryInnerGrids = () => {
    const categoryTabPannels: ReactNode[] = [];

    for (const [key, value] of Object.entries(WorkTypeEnum)) {
      const hidden = selectedType !== value;
      const classes = [CLASSES.INNER_GRID];
      if (hidden) classes.push(GENERAL_CLASSES.HIDDEN);

      categoryTabPannels.push(
        <div key={`${id}-${value}-pannel`} id={`${id}-${value}-pannel`} className={classes.join(' ')} role="tabpanel" aria-hidden={hidden}>
          <div className={CLASSES.INNER_GRID_EMPTY_SPACE}/>
          {getWorkList(value)}
        </div>
      );
    }

    return categoryTabPannels;
  }

  const getWorkList = (type: WorkTypeEnum) => {
    return workList.filter((work) => work.type === type)
            .sort((w1, w2) => w2.index - w1.index)
            .map((work) => <WorkThumbnail key={work.id} work={work}/>);
  }

  const handleCategorySelectorChange = (type: WorkTypeEnum, focusWithin: boolean = false) => {
    if (type !== selectedTypeRef.current) {  
      selectedTypeRef.current = type;
      setSelectedType(selectedTypeRef.current);
      updateCategory(type);
      if (focusWithin) updateFocus(`#${id}-selector-${type}`);
    }
  }

  const handleCategorySelectorMouseEnter = () => {
    CursorService.instance.enter();
  }

  const handleCategorySelectorMouseLeave = () => {
    CursorService.instance.leave();
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    console.log(event.key);
    switch(event.key) {
      case "ArrowRight": handleArrowLeftKeyDown(); break;
      case "ArrowLeft": handleArrowRightKeyDown(); break;
      case "Home": handleHomeKeyDown(); break;
      case "End": handleEndKeyDown(); break;
      case "Tab": handleTabKeyDown(event); break;
      case "Shift": handleShiftKeyDown(); break;
    }
  }

  const handleTabKeyDown = (event: KeyboardEvent) => {
    event.preventDefault;
    event.stopPropagation();
    console.log("TAB");
    if (isShiftKeyDownRef.current) {
      
    } else {
    
    }
  }

  const handleShiftKeyDown = () => {
    console.log("SHIFT");
    isShiftKeyDownRef.current = !isShiftKeyDownRef.current;
  }

  const handleArrowLeftKeyDown = () => {
    const previousType = getPreviousWorkType();
    if (previousType) handleCategorySelectorChange(previousType, true);
  }

  const handleArrowRightKeyDown = () => {
    const nextType = getNextWorkType();
    if (nextType) handleCategorySelectorChange(nextType, true);
  }

  const handleHomeKeyDown = () => {
    const types = Object.values(WorkTypeEnum);
    handleCategorySelectorChange(types[0], true);
  }

  const handleEndKeyDown = () => {
    const types = Object.values(WorkTypeEnum);
    handleCategorySelectorChange(types[types.length - 1], true);
  }

  const getNextWorkType = () => {
    const types = Object.values(WorkTypeEnum);
    const index = types.indexOf(selectedTypeRef.current);
    
    console.log(index);
    if (index >= 0) {
      if (index < types.length - 1) return types[index + 1];
      else if (index === types.length - 1) return types[0];
    }

    return undefined;
  }

  const getPreviousWorkType = () => {
    const types = Object.values(WorkTypeEnum);
    const index = types.indexOf(selectedTypeRef.current);

    console.log(index);
    if (index >= 0 && index < types.length) {
      if (index > 0) return types[index - 1];
      else return types[types.length - 1];
    }

    return undefined;
  }

  const updateCategory = (type: WorkTypeEnum) => {
    gsap.killTweensOf(descriptionRef.current, 'y, opacity');
    const timeline = gsap.timeline();
    timeline.to(descriptionRef.current, { duration: .4, ease: Power3.easeIn, y: '1rem', opacity: 0 });
    if (type) timeline.call(() => setDescription(workTypeToDescription(type)));
    timeline.to(descriptionRef.current, { duration: .4, ease: Power3.easeOut, y: 0, opacity: 1 });
  }

  const updateFocus = (selector: string) => {
    const element: HTMLElement | null = document.querySelector(selector);
    console.log(selector, element);
    if (element) element.focus();
  }

  return (
    <div id={id} className={CLASSES.GRID}>
      <div className={CLASSES.HEADER}>
        <div className={CLASSES.CATEGORY_SELECTORS} role="tablist" aria-labelledby={`${id}-label`} onKeyDown={handleKeyDown}>
          { getCategorySelectors() }
        </div>
        <p ref={descriptionRef}>{description}</p>
      </div>
      { getCategoryInnerGrids() }
    </div>
  );
}