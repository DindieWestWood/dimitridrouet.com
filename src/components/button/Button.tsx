import { ReactNode, useEffect, useRef } from "react";
import "./Button.scss";
import { Power3, gsap } from "gsap";
import { CursorTriggerProps } from "../../assets/scripts/utils";
import CursorService from "../../services/cursor.service";

export interface ButtonProps extends CursorTriggerProps {
  handleClick?: () => void,
  children?: ReactNode,
}

export default function Button ({handleClick, tooltip, children}: ButtonProps) {  
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    document.addEventListener('pointermove', handlePointerMove);
  }, []);

  const handlePointerMove = (event: PointerEvent) => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      gsap.set(buttonRef.current, { '--x': `${event.clientX - rect.x}px`, '--y': `${event.clientY - rect.y}px` });
    }
  }

  const handlePointerEnter = () => {
    if (buttonRef && buttonRef.current) {
      const size = getSize(buttonRef.current.getBoundingClientRect());
      gsap.killTweensOf(buttonRef.current, "--size");
      gsap.to(buttonRef.current, { duration: .2, ease: Power3.easeInOut, '--size': `${size}px` });
      CursorService.instance.enter(tooltip)
    }
  }

  const handlePointerLeave = () => {
    if (buttonRef && buttonRef.current) {
      gsap.killTweensOf(buttonRef.current, "--size");
      gsap.to(buttonRef.current, { duration: .2, ease: Power3.easeInOut, '--size': '10px' });
      CursorService.instance.leave()
    }
  }

  const getSize = (rect: DOMRect): number => {
    const { width: width, height: height } = rect;
    const h = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    return (h / Math.max(width, height)) * 150;
  }
  
  return (
    <button ref={buttonRef} role="button" 
            onClick={handleClick}
            onPointerEnter={() => handlePointerEnter()}
            onPointerLeave={() => handlePointerLeave()}>
        {children}
    </button>
  );
}