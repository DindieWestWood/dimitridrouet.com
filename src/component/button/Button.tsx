import { ReactNode, useRef } from "react";
import "./Button.scss";
import { Power3, gsap } from "gsap";
import { CLASSES, CursorTriggerProps, Position } from "../../assets/scripts/utils";

export interface ButtonProps extends CursorTriggerProps {
  handleClick?: () => void,
  children?: ReactNode,
}

export default function Button ({handleClick, tooltip, cursorRef, children}: ButtonProps) {  
  const hoverEffectRef = useRef<HTMLDivElement>(null);
  const hoverTimelineRef = useRef<gsap.core.Timeline>(gsap.timeline());
  
  const activeEffectRef = useRef<HTMLDivElement>(null);
  const activeTimelineRef = useRef<gsap.core.Timeline>(gsap.timeline());

  const handlePointerEnter = (event: React.PointerEvent<HTMLButtonElement>) => {
    triggerEffect(event, hoverEffectRef, hoverTimelineRef, true);
    cursorRef?.current?.open(tooltip);
  }

  const handlePointerLeave = (event: React.PointerEvent<HTMLButtonElement>) => {
    triggerEffect(event, hoverEffectRef, hoverTimelineRef, false);
    cursorRef?.current?.close();
  };

  const triggerEffect = (
    event: React.PointerEvent<HTMLButtonElement>, 
    elementRef: React.RefObject<HTMLDivElement>, 
    timelineRef: React.MutableRefObject<gsap.core.Timeline>,
    show: boolean) => {
      const rect = (event.target as HTMLButtonElement).getBoundingClientRect();
      const size = show ? getSize(rect) : 0;
      const center = getCenter(rect, {x: event.clientX, y: event.clientY });
      
      timelineRef?.current
        .set(elementRef?.current, { "--effect-position": `${center.x}% ${center.y}%` })
        .to(elementRef?.current, { duration: .3, ease: Power3.easeInOut, "--effect-size": `${size}%` });
  };

  const getCenter = (rect: DOMRect, position: Position): Position => {
    return {
      x: ((position.x - rect.left) / rect.width) * 100,
      y: ((position.y - rect.top) / rect.height) * 100
    } as Position;
  }

  const getSize = (rect: DOMRect): number => {
    const { width: width, height: height } = rect;
    const h = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    return (h / Math.max(width, height)) * 150;
  }
  
  return (
    <button onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={($event) => triggerEffect($event, activeEffectRef, activeTimelineRef, true)}
      onPointerUp={($event) => triggerEffect($event, activeEffectRef, activeTimelineRef, false)}>
        <div className={CLASSES.BACKGROUND}/>
        <div className={CLASSES.HOVER_EFFECT} ref={hoverEffectRef}/>
        <div className={CLASSES.ACTIVE_EFFECT} ref={activeEffectRef}/>
        {children}
    </button>
  );
}