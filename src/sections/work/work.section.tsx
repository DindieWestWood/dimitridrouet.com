import { useGSAP } from "@gsap/react";
import { CLASSES as GENERAL_CLASSES } from "../../assets/scripts/utils";
import WorkGrid from "../../components/work-grid/work-grid";
import IWork from "../../interfaces/work.interface";
import "./work.section.scss"
import gsap from "gsap";
import { useRef } from "react";

export const IDS = {
  SECTION: 'work-section',
  GRID: 'work-grid'
}

export interface WorkSectionProps {
  workList: IWork[];
}

export default function WorkSection ({workList} : WorkSectionProps) {
  const container = useRef(null);
  const ID = 'work-grid';

  useGSAP(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: `#${IDS.SECTION}`,
        pin: true, // pin the trigger element while active
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "+=500", // end after scrolling 500px beyond the start
        scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
        snap: {
          snapTo: "labels", // snap to the closest label in the timeline
          duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
          delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
          ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
        },
      },
    })
      
  }, { scope: container });

  return (
    <section id={IDS.SECTION} ref={container}>
      <div className={GENERAL_CLASSES.HEADLINE_CONTAINER}>
        <p className={GENERAL_CLASSES.INDEX} aria-hidden='true'>002/</p>
        <h1 id={`${ID}-label`} className={GENERAL_CLASSES.DISPLAY}>Work</h1> 
      </div>
      {/* <WorkGrid id={ID} workList={workList}/> */}
    </section>
  );
}