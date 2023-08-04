import { ReactNode, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { DEFAULT_POSITION, Position, Translation } from "../../assets/scripts/utils";
import "./Cursor.scss";
import { Back, Power3, gsap } from "gsap";


const CLASSES = {
  HOST: "cursor",
  POINTER: "cursor-pointer",
  TOOLTIP: "cursor-tooltip"
}

const DEFAULT_TRANSLATION: Translation = {
  x: 0,
  y: 50,
  z: 0
}

export interface CursorProps { }
export interface CursorControl { 
  open: (tooltip?: ReactNode) => void,
  close: () => void
}

export const Cursor = forwardRef<CursorControl, CursorProps>((props, ref) => {
  const [targetPosition, setTargetPosition] = useState<Position>(DEFAULT_POSITION);
  const [renderedPosition, setRenderedPosition] = useState<Position>(DEFAULT_POSITION);
  const [tooltip, setTooltip] = useState<ReactNode>(null);
  
  const pointerTimelineRef = useRef<gsap.core.Timeline>(gsap.timeline());
  const tooltipTimelineRef = useRef<gsap.core.Timeline>(gsap.timeline());
  const tooltipRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<Position>(renderedPosition);
  const translationRef = useRef<Translation>(DEFAULT_TRANSLATION);
  const requestRef = useRef<number>();
  const speed = .067;


  const handleMouseMove = (e: MouseEvent) => {
    setTargetPosition({ x: e.clientX, y: e.clientY });
  }

  const animateCursor = () => {
    const { x: tPx, y: tPy } = targetPosition;
    const { x: cPx, y: cPy } = positionRef.current;

    const dPx = (tPx - cPx) * speed;
    const dPy = (tPy - cPy) * speed;

    const newPosition = { x: cPx + dPx, y: cPy + dPy };
    setRenderedPosition(newPosition);
    positionRef.current = newPosition;
  }

  const animateTooltip = () => {
    const { x: tPx, y: tPy } = targetPosition;
    const { x: cTx, y: cTy } = translationRef.current;

    const rT = { x: tPx / window.innerWidth, y: tPy / window.innerHeight };
    let tT: Translation;
    let origin: string;

    if (rT.x < .1) {
      tT = { x: 50, y: -(rT.y * 100 - 50), z: 0 }
      origin = `${rT.y * 100}% left`;
    } else if (rT.x > .9) {
      tT = { x: -50, y: -(rT.y * 100 - 50), z: 0 }
      origin = `${rT.y * 100}% right`;
    } else if (rT.y < .5) {
      tT = { x: -(rT.x * 100 - 50), y: 50, z: 0 }
      origin = `top ${rT.x * 100}%`;
    } else {
      tT = { x: -(rT.x * 100 - 50), y: -50, z: 0 }
      origin = `bottom ${rT.x * 100}%`;
    }

    const dTx = (tT.x - cTx) * speed;
    const dTy = (tT.y - cTy) * speed;

    const newTranslation = { x: cTx + dTx, y: cTy + dTy, z: 0 }
    translationRef.current = newTranslation;
    if (tooltipRef) gsap.set(tooltipRef.current, { x: ` ${newTranslation.x}%`, y: `${newTranslation.y}%`, transformOrigin: origin });
  }

  const animate = () => {
    animateCursor();
    animateTooltip();

    requestRef.current = requestAnimationFrame(animate);
  }

  const open = (tt?: ReactNode) => {
    pointerTimelineRef?.current.kill();
    pointerTimelineRef.current = gsap.timeline();
    pointerTimelineRef.current.to(`.${CLASSES.POINTER}`,  { duration: .4, ease: Back.easeOut.config(3), scale: 2 });
    
    if (tt) {
      tooltipTimelineRef?.current
        .call(() => setTooltip(tt))
        .to(`.${CLASSES.TOOLTIP}`, { duration: .6, ease: Back.easeOut.config(3), scale: 1 });
    }
  }

  const close = () => {
    console.log("CLOSE");
    pointerTimelineRef.current.to(`.${CLASSES.POINTER}`,  { duration: .4, ease: Back.easeIn.config(3), scale: 1 });
    if (tooltip) {
      tooltipTimelineRef?.current
        .to(`.${CLASSES.TOOLTIP}`, { duration: .2, ease: Back.easeIn.config(3), scale: 0 })
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetPosition, speed]);

  useImperativeHandle(ref, () => ({
    open: open,
    close: close,
    setTooltip: (tooltip: ReactNode) => setTooltip(tooltip)
  }));

  return (
    <div className={CLASSES.HOST} style={{ left: `${renderedPosition.x}px`, top: `${renderedPosition.y}px` }}>
      <div className={CLASSES.POINTER}/>
      <div className={CLASSES.TOOLTIP} ref={tooltipRef}>
        {tooltip}
      </div>
    </div>
  )
});

export default Cursor;