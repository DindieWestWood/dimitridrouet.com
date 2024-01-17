import gsap, { Power3 } from "gsap";
import { CLASSES as GENERAL_CLASSES } from "../../assets/scripts/utils";
import Loadbar from "../../components/loadbar/loadbar";
import "./loader.section.scss";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

const IDS = {
  SECTION: 'loader-section'
}

const CLASSES = {
  GRID: 'loader-section-grid',
  LOADER_INFO_CONTAINER: 'loader-info-container',
  LOADBAR_CONTAINER: 'loader-loadbar-container',
}

export interface LoaderSectionControl {
  close: (callback?: () => void) => void;
}

export interface LoaderSectionProps  {
  loadingPercentage: number;
}

const LoaderSection = forwardRef<LoaderSectionControl, LoaderSectionProps>(({loadingPercentage}: LoaderSectionProps, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [loaded, setLoaded] = useState(false);

  useImperativeHandle(ref, () => ({
    close: hideAnimation
  }));

  useEffect(() => {
    if (sectionRef) {
      gsap.killTweensOf(sectionRef.current, "--progress");
      gsap.to(sectionRef.current, { duration: .2, ease: Power3.easeInOut, "--progress": loadingPercentage / 100});
    }
  }, [loadingPercentage]);

  const hideAnimation = (callback?: () => void) => {
    const showableTexts = sectionRef.current?.querySelectorAll(`.${GENERAL_CLASSES.SHOWABLE_TEXT}`);
    const timeline = gsap.timeline();
    if (showableTexts) {
      gsap.killTweensOf(showableTexts, "opacity, y");
    }

    timeline.to(sectionRef.current, { delay: .2, duration: .8, opacity: 0 });
    timeline.call(() => {
      setLoaded(true);
      if (callback) callback();
    });
  }

  return (
    !loaded ? 
      <section ref={sectionRef} id={IDS.SECTION}>
        <div className={CLASSES.GRID}>
          <div className={CLASSES.LOADER_INFO_CONTAINER}>
            <p className={GENERAL_CLASSES.INDEX}>dimitridrouet.com</p>
            <h1 className={GENERAL_CLASSES.DISPLAY}>Welcome</h1>
            <p>Gathering the finest details of my portfolio.</p>
            <p>Hold tight, it's worth the wait!</p>
          </div>
          <div className={CLASSES.LOADBAR_CONTAINER}>
            <Loadbar value={loadingPercentage}/>
          </div>
        </div>
      </section> : 
      <div className={GENERAL_CLASSES.ACCESSIBILITY_TEXT} role="alert">
        <p>Website ready to be explored</p>
      </div>
  );
});

export default LoaderSection;