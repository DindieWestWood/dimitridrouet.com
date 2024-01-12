import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import "./drag-and-drop-container.scss";
import { Position } from "../../../assets/scripts/utils";
import { Power3, gsap } from "gsap";
import CursorTrigger, { CursorStyle } from "../../cursor/cursor-trigger/cursor-trigger";
import { CursorControl } from "../../cursor/Cursor";
import { CLASSES as GENERAL_CLASSES } from "../../../assets/scripts/utils";

export interface DragAndDropContainerProps {
  width: string,
  height: string,
  children?: ReactNode,
  message?: string,
  cursorRef?: RefObject<CursorControl>;
  placeholderTooltip?: string;
  targetTooltip?: string;
}

export const CLASSES = {
  HOST: "drag-and-drop-container",
  PLACEHOLDER: "drag-and-drop-placeholder",
  TARGET: "drag-and-drop-target",
  IS_DRAGGING: "is-dragging"
}

export default function DragAndDropContainer({width, height, message, children, cursorRef, placeholderTooltip, targetTooltip}: DragAndDropContainerProps) {
  const placeholderRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const isDragging = useRef(false);
  const initialPos = useRef<Position>({ x: 0, y: 0 });
  const currentPos = useRef<Position>({ x: 0, y: 0 });
  const offset = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    placeholderRef?.current?.addEventListener('click', handlePlaceholderClick);
    targetRef?.current?.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      targetRef?.current?.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  function handlePointerDown(event: PointerEvent) : void {
    isDragging.current = true;
    setDragging(isDragging.current);
    initialPos.current = { x: event.clientX, y: event.clientY };
    currentPos.current = { x: event.clientX, y: event.clientY };
    targetRef.current?.classList.add(CLASSES.IS_DRAGGING);
  }

  function handlePointerUp(event: PointerEvent) : void {
    isDragging.current = false;
    setDragging(isDragging.current);
    const deltaPos = getDeltaPosition();
    offset.current = { 
      x: offset.current.x + deltaPos.x,
      y: offset.current.y + deltaPos.y 
    }
    initialPos.current = { x: 0, y: 0 };
    currentPos.current = { x: 0, y: 0 };

    targetRef.current?.classList.remove(CLASSES.IS_DRAGGING);
    if (isPointerOnPlaceholder({ x: event.clientX, y: event.clientY })) resetTarget();
  }

  function handlePointerMove(event: PointerEvent) : void {
    if (isDragging.current) {
      currentPos.current = { x: event.clientX, y: event.clientY };
      gsap.set(targetRef.current, { 
        x: offset.current.x + (currentPos.current.x - initialPos.current.x),
        y: offset.current.y + (currentPos.current.y - initialPos.current.y)
      });
    }
  }

  function handlePlaceholderClick(event: Event) : void {
    resetTarget();
  }

  function isPointerOnPlaceholder(position: Position) : boolean {
    const placeholderRect = placeholderRef.current?.getBoundingClientRect();

    if (!placeholderRect) return false;

    return !(
      position.x > placeholderRect.right ||
      position.x < placeholderRect.left ||
      position.y > placeholderRect.bottom ||
      position.y < placeholderRect.top
    );

  }

  function resetTarget() : void {
    const deltaPos = getDeltaPosition();
    const isVerticalTranslation = deltaPos.x > deltaPos.y;
    gsap.to(targetRef.current, { 
      duration: isVerticalTranslation ? .8 : .6,
      delay: isVerticalTranslation ? 0 : .2, 
      ease: Power3.easeInOut,
      y: 0
    });
    gsap.to(targetRef.current, {
      duration: isVerticalTranslation ? .6 : .8,
      delay: isVerticalTranslation ? .2 : 0,
      ease: Power3.easeInOut,
      x: 0
    });

    offset.current = { x: 0, y: 0 };
  }

  function getDeltaPosition() {
    return {
      x: (currentPos.current.x - initialPos.current.x),
      y: (currentPos.current.y - initialPos.current.y)
    }
  }

  return (
    <div className={CLASSES.HOST} style={{width: width, height: height}}>
      <CursorTrigger cursorRef={cursorRef} style={CursorStyle.POINTER} toolip={<p className={GENERAL_CLASSES.ONE_LINE}>{placeholderTooltip}</p>}>
        <div className={CLASSES.PLACEHOLDER} ref={placeholderRef}>
            {message}
        </div>
      </CursorTrigger>
      <CursorTrigger cursorRef={cursorRef} style={dragging ? CursorStyle.GRABBING : CursorStyle.GRAB} toolip={<p className={GENERAL_CLASSES.ONE_LINE}>{targetTooltip}</p>}>
        <div className={CLASSES.TARGET} ref={targetRef}>
          {children}
        </div>
      </CursorTrigger>
    </div>
  );
}