import "./cursor-tooltip.scss"
import { ReactNode, forwardRef, useRef, useImperativeHandle, useState } from "react";
import { gsap, Back } from "gsap";

export interface CursorTooltipProps {}
export interface CursorTooltipControl {
  open: (tooltip?: ReactNode) => void,
  close: () => void
}

export const CLASSES = {
  HOST: "cursor-tooltip"
}
 
const CursorTrigger = forwardRef<CursorTooltipControl, CursorTooltipProps>((props, ref) => {
  const [tooltip, setTooltip] = useState<ReactNode>(null);

  const open = (tooltip: ReactNode) => {
    gsap.killTweensOf(`.${CLASSES.HOST}`, "scale");
    gsap.timeline()
      .to(`.${CLASSES.HOST}`, { duration: .2, ease: Back.easeIn.config(3), scale: 0 })
      .call(() => setTooltip(tooltip))
      .to(`.${CLASSES.HOST}`, { duration: .3, ease: Back.easeOut.config(3), scale: 1});
  }

  const close = () => {
    gsap.killTweensOf(`.${CLASSES.HOST}`, "scale");
    gsap.to(`.${CLASSES.HOST}`, { duration: .2, ease: Back.easeIn.config(3), scale: 0 });
  }

  useImperativeHandle(ref, () => ({
    open: open,
    close: close
  }));

  return (
    <div className={CLASSES.HOST}>
      {tooltip}
    </div>
  );
});

export default CursorTrigger;