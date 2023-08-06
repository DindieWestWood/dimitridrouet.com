import { ReactNode, useEffect, useRef } from "react";
import "./parallax-effect.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

const CLASSES = {
  PARALLAX_EFFECT: "parallax-effect"
}

export interface ParallaxEffectProps {
  percentage?: number; 
  children?: ReactNode;
}

export default function ParallaxEffect({percentage = 50, children}: ParallaxEffectProps) {

  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: parallaxRef.current,
        scrub: true,
      }
    }).to(parallaxRef.current, { ease: "none", yPercent: percentage });
    return () => {
      timeline.kill();
    };
  }, [])

  return (
    <div className={CLASSES.PARALLAX_EFFECT} ref={parallaxRef}>
      {children}
    </div>
  );
}