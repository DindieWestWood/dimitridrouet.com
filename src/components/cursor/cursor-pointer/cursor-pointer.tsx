import "./cursor-pointer.scss";
import { gsap, Back } from "gsap";

const CLASSES = {
  HOST: "cursor-pointer"
}

export const open = () => {
  gsap.killTweensOf(`.${CLASSES.HOST}`, "scale");
  gsap.to(`.${CLASSES.HOST}`, { duration: .3, ease: Back.easeOut.config(6), scale: 2});
}

export const close = () => {
  gsap.killTweensOf(`.${CLASSES.HOST}`, "scale");
  gsap.to(`.${CLASSES.HOST}`, { duration: .3, ease: Back.easeInOut.config(6), scale: 1});
}

export default function CursorPointer() {
  return <div className={CLASSES.HOST}/>
}