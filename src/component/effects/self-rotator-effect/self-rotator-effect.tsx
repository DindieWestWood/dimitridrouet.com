import { ReactNode, useEffect, useRef } from "react";
import './self-rotator-effect.scss';
import { Linear, gsap } from "gsap";

export const CLASSES = {
  CONTAINER: "self-rotator"
}

export interface SelfRotatorEffectProps {
  speed?: number;
  clockwise?: boolean;
  children?: ReactNode;
}

export default function SelfRotatorEffect({ speed = 1.15, clockwise = false, children }: SelfRotatorEffectProps) {
  const rotatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1 })
      .fromTo(rotatorRef.current, { rotate: "0deg" }, { 
        duration: (60 / speed), 
        ease: Linear.easeNone, 
        rotate: clockwise ? "360deg" : "-360deg"
      });

    return () => { timeline.kill(); }
  }, []);

  return (
    <div className={CLASSES.CONTAINER} ref={rotatorRef}>
      {children}
    </div>  
  )
}