import { ReactNode, useEffect, useRef, useState } from "react";
import { DEFAULT_POSITION, Position, Translation } from "../../assets/scripts/utils";
import "./Cursor.scss";
import { gsap, Power3, Back } from "gsap";
import CursorTooltip, { CursorTooltipControl } from "./cursor-tooltip/cursor-tooltip";
import { CLASSES as TOOLTIP_CLASSES } from "./cursor-tooltip/cursor-tooltip"; 
import CursorService, { ICursorStateMachine } from "../../services/cursor.service";
import CursorPointer, { CursorPointerControls } from "./cursor-pointer/cursor-pointer";

const CLASSES = {
  HOST: "cursor",
  POINTER: "cursor-pointer"
}

const DEFAULT_TRANSLATION: Translation = {
  x: 0,
  y: 50,
  z: 0
}

export default function Cursor () {
  const [visible, setVisible] = useState<boolean>(false);
  const [targetPosition, setTargetPosition] = useState<Position>(DEFAULT_POSITION);
  const [renderedPosition, setRenderedPosition] = useState<Position>(DEFAULT_POSITION);

  const cursorRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<CursorPointerControls>(null);
  const tooltipRef = useRef<CursorTooltipControl>(null);
  const positionRef = useRef<Position>(renderedPosition);
  const translationRef = useRef<Translation>(DEFAULT_TRANSLATION);
  const requestRef = useRef<number>();
  
  
  const speed = .1;

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    const subscription = CursorService.instance.stateMachine$.subscribe(handleCursorStateChange);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetPosition, speed]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!visible) setVisible(true);
    setTargetPosition({ x: e.clientX, y: e.clientY });
  }

  const handleCursorStateChange = (state: ICursorStateMachine) => {
    if (state.open) open(state.tooltip);
    else close();
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
    if (tooltipRef.current) gsap.set(`.${TOOLTIP_CLASSES.HOST}`, { x: ` ${newTranslation.x}%`, y: `${newTranslation.y}%`, transformOrigin: origin });
  }

  const animate = () => {
    animateCursor();
    animateTooltip();

    requestRef.current = requestAnimationFrame(animate);
  }

  const open = (tooltip: ReactNode) => {
    gsap.killTweensOf(cursorRef.current, "opacity");
    gsap.to(cursorRef.current, { duration: .3, ease: Power3.easeOut, opacity: .8 });
    
    pointerRef.current?.open();
    if (tooltip) tooltipRef.current?.open(tooltip);
  }

  const close = () => {
    gsap.killTweensOf(cursorRef.current, "opacity");
    gsap.to(cursorRef.current, { duration: .3, ease: Power3.easeOut, opacity: .2  });

    pointerRef.current?.close();
    tooltipRef.current?.close();
  }

  return (
    <>
      {
        visible ?
          <div ref={cursorRef} className={CLASSES.HOST} style={{ left: `${renderedPosition.x}px`, top: `${renderedPosition.y}px` }}>
            <CursorPointer ref={pointerRef}/>
            <CursorTooltip ref={tooltipRef}/>
          </div> : ''
      }
    </>
  );
}