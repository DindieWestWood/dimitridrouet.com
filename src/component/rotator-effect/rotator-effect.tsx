import { ReactNode, useEffect, useRef } from "react";
import "./rotator-effect.scss";
import { Linear, gsap } from "gsap";

const CLASSES = {
  CONTAINER: "rotator-effect-container",
  ROTATOR: "rotator-effect",
  INNER: "rotator-effect-inner",
}

export interface RotatorEffect {
  speed?: number;
  minTranslation?: number;
  maxTranslation?: number;
  children?: ReactNode;
}

export default function RotatorEffect({speed = 1, minTranslation = 2, maxTranslation = 4, children}: RotatorEffect) {
  const rotatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rotationTimeline = gsap.timeline({ repeat: -1 }).fromTo(rotatorRef.current, { "--rotation": "0deg" }, { duration: (60 / speed), ease: Linear.easeNone, "--rotation": "360deg" });
    const translationTimeline = gsap.timeline({ repeat: -1, yoyo: true }).fromTo(rotatorRef.current, { "--translation": `${minTranslation}rem` }, { duration: (15 / speed), ease: Linear.easeNone, "--translation": `${maxTranslation}rem` });
    return () => {
      rotationTimeline.kill();
      translationTimeline.kill();
    };
  }, []);

  return (
    <div className={CLASSES.CONTAINER}>
      <div className={CLASSES.ROTATOR} ref={rotatorRef}>
        <div className={CLASSES.INNER}>
          {children}
        </div>
      </div>
    </div>
  );
}