import { forwardRef, useImperativeHandle, useRef } from "react";
import "./cursor-pointer.scss";
import { gsap, Back } from "gsap";

const CLASSES = {
  HOST: "cursor-pointer"
}

export interface CursorPointerProps {}
export interface CursorPointerControls {
  open: () => void;
  close: () => void;
}

const CursorPointer = forwardRef<CursorPointerControls, CursorPointerProps>((props, ref) => {
  const pointerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    open: open,
    close: close
  }))

  const open = () => {
    gsap.killTweensOf(pointerRef.current, 'scale');
    gsap.to(pointerRef.current, { duration: .3, ease: Back.easeOut.config(6), scale: 2 });
  }

  const close = () => {
    gsap.killTweensOf(pointerRef.current, 'scale');
    gsap.to(pointerRef.current, { duration: .3, ease: Back.easeOut.config(6), scale: 1 });
  }

  return <div ref={pointerRef} className={CLASSES.HOST}/>;
}); 

export default CursorPointer;