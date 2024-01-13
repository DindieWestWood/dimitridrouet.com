import { useEffect, useRef } from "react";
import "./parallax-effect.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { EffectProps } from "../../../assets/scripts/utils";

const CLASSES = {
  PARALLAX_EFFECT: "parallax-effect"
}

export interface ParallaxEffectProps extends EffectProps {
  speed?: number;
}

export default function ParallaxEffect({speed = .5, children, style = {}}: ParallaxEffectProps) {

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
  }, []);

  return (
    <div className={CLASSES.PARALLAX_EFFECT} style={style} ref={parallaxRef}>
      {children}
    </div>
  );
}