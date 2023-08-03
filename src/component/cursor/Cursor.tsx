import { useEffect, useRef, useState } from "react";
import { DEFAULT_POSITION, Position, Translation } from "../../assets/scripts/utils";
import "./Cursor.scss";
import { gsap } from "gsap";


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

export default function Cursor({ }: CursorProps) {
  const [targetPosition, setTargetPosition] = useState<Position>(DEFAULT_POSITION);
  const [renderedPosition, setRenderedPosition] = useState<Position>(DEFAULT_POSITION);
  
  const tooltipRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<Position>(renderedPosition);
  const translationRef = useRef<Translation>(DEFAULT_TRANSLATION);
  const requestRef = useRef<number>();
  const speed = .085;

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

  return (
    <div className={CLASSES.HOST} style={{ left: `${renderedPosition.x}px`, top: `${renderedPosition.y}px` }}>
      <div className={CLASSES.POINTER}/>
      <div className={CLASSES.TOOLTIP} ref={tooltipRef}/>
    </div>
  )
} 