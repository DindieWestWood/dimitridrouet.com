import { ReactNode, useRef } from "react";
import "./hover-effect.scss";
import { Power3, gsap } from "gsap";
import { Position } from "../../../assets/scripts/utils";

export const CLASSES = {
  CONTAINER: "hover-effect-container",
  EFFECT: "hover-effect"
}

export interface HoverEffectProps {
  width: string,
  height: string,
  maxRotation?: number;
  disabled?: boolean;
  children?: ReactNode;
}

export default function HoverEffect({width, height, maxRotation = 10, disabled = false, children}: HoverEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<HTMLDivElement>(null);

  function onPointerEnter($event: any) {
    if (!disabled) {
      setEffect({ x: $event.clientX, y: $event.clientY });
      gsap.killTweensOf(effectRef.current, "--smoothRatio");
      gsap.to(effectRef.current, { duration: .6, ease: Power3.easeInOut, "--smoothRatio": 1 });
    }
  }

  function onPointerLeave($event: any) {
    if (!disabled) {
      gsap.killTweensOf(effectRef.current, "--smoothRatio");
      gsap.timeline()
        .to(effectRef.current, { duration: .6, ease: Power3.easeInOut, "--smoothRatio": 0 })
        .set(effectRef.current, { "--rotateY": "0deg", "--rotateX": "0deg", "--glowOrigin": "50% 50%" });
    }
  }

  function onPointerMove($event: any) {
    if (!disabled) {
      setEffect({ x: $event.clientX, y: $event.clientY });
    }
  }

  function setEffect(pointerPosition: Position) {
    if (containerRef.current) {
      const absoluteRatio = getAbsoluteRatio(pointerPosition, containerRef.current.getBoundingClientRect());
    
      gsap.set(effectRef.current, {
        "--rotateY": `${((absoluteRatio.x * 2) - 1) * maxRotation}deg`,
        "--rotateX": `${((absoluteRatio.y * 2) -1) * maxRotation * -1}deg`,
        "--glowOrigin": `${(1 - absoluteRatio.x) * 100}% ${(1 - absoluteRatio.y) * 100}%`
      });
    }
  }

  function getAbsoluteRatio(cursorPosition: Position, rect: DOMRect) : Position {
    return  {
      x: (cursorPosition.x - rect.x) / rect.width,
      y: (cursorPosition.y - rect.y) / rect.height
    }
  }

  return (
    <div className={CLASSES.CONTAINER} ref={containerRef} style={{width: width, height: height}} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave} onPointerMove={onPointerMove}>
      <div className={CLASSES.EFFECT} ref={effectRef}>
        {children}
      </div>
    </div>
  );
}