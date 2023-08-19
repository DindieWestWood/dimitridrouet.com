import { ReactNode, useEffect, useRef } from "react";
import "./parallax-effect.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const CLASSES = {
  PARALLAX_EFFECT: "parallax-effect"
}

export interface ParallaxEffectProps {
  speed?: number; 
  children?: ReactNode;
}

export default function ParallaxEffect({speed = .5, children}: ParallaxEffectProps) {

  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(parallaxRef.current, {
      y: (i, el) => (1 - speed) * ScrollTrigger.maxScroll(window) ,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0
      }
    });
  }, [])

  return (
    <div className={CLASSES.PARALLAX_EFFECT} ref={parallaxRef}>
      {children}
    </div>
  );
}