import { ReactNode, useRef } from "react";
import "./tab.scss";
import CursorService from "../../services/cursor.service";
import { useGSAP } from "@gsap/react";
import gsap, { Back, Power3 } from "gsap";
import { COLORS, SHADOW } from "../../assets/scripts/utils";

export const CLASSES = {
  HOST: "tab",
  OVERLAY: "tab-overlay"
}

export interface TabProps {
  active?: boolean;
  id: string;
  children: ReactNode;
  onClick: (id: string) => void;
}

export default function Tab({active = false, id, children, onClick}: TabProps) {
  const container = useRef<HTMLButtonElement>(null);
  const isInitialized = useRef<boolean>(false);

  useGSAP(() => {
    if (!isInitialized.current) init();
    else handleActivationChanged();
  }, { dependencies: [active], scope: container })

  const init = () => {
    if (active) setActive();
    else setDefault();
    isInitialized.current = true;
  }

  const handleActivationChanged = () => {
    if (active) toActive();
    else toDefault();
  }

  const handleMouseEnter = () => {
    if (!active) {
      const overlay = container.current?.querySelector(`.${CLASSES.OVERLAY}`);
      if (overlay) gsap.to(overlay, { duration: .2, ease: Back.easeOut.config(4), '--background-size': `${4}px`});
    }
  }

  const handleMouseLeave = () => {
    if (!active) {
      const overlay = container.current?.querySelector(`.${CLASSES.OVERLAY}`);
      if (overlay) gsap.to(overlay, { duration: .2, ease: Back.easeIn.config(4), '--background-size': `${0}px`});
    }
  }

  const handleClick = () => {
    if (!active) {
      CursorService.instance.leave();
      onClick(id);
    }
  }

  const setActive = () => {
    gsap.set(container.current, { boxShadow: SHADOW.DEFAULT });
    gsap.set(`.${CLASSES.OVERLAY}`, { backgroundColor: COLORS.MAIN_500, '--background-size': `${getSize()}px`, '--after-scale': 1 });
  }

  const setDefault = () => {
    gsap.set(container.current, { boxShadow: SHADOW.NONE });
    gsap.set(`.${CLASSES.OVERLAY}`, { backgroundColor: COLORS.DARK_PRIMARY_TEXT, '--background-size': `${0}px`, '--after-scale': 0 });
  }

  const toActive = () => {
    gsap.killTweensOf(`.${CLASSES.HOST}`, 'boxShadow');
    gsap.killTweensOf(`.${CLASSES.OVERLAY}`, 'backgroundColor,"--background-size","--after-scale"');
    gsap.timeline()
      .to(`.${CLASSES.OVERLAY}`, { duration: .2, ease: Power3.easeInOut, backgroundColor: COLORS.MAIN_500 }, 'step-1')
      .to(`.${CLASSES.OVERLAY}`, { duration: .4, ease: Power3.easeInOut, "--background-size": `${getSize()}px`}, 'step-1')
      .to(`.${CLASSES.OVERLAY}`, { delay: .2, duration: .2, ease: Back.easeOut.config(4), "--after-scale": 1 }, 'step-1')
      .to(container.current, { duration: .8, ease: Power3.easeInOut, boxShadow: SHADOW.DEFAULT }, 'step-2');
  }

  const toDefault = () => {
    gsap.killTweensOf(`.${CLASSES.HOST}`, 'boxShadow');
    gsap.killTweensOf(`.${CLASSES.OVERLAY}`, 'backgroundColor,"--background-size","--after-scale"');
    gsap.timeline()
      .to(container.current, { duration: .1, ease: Power3.easeInOut, boxShadow: SHADOW.NONE }, 'step-1')
      .to(`.${CLASSES.OVERLAY}`, { duration: .2, ease: Power3.easeInOut, backgroundColor: COLORS.DARK_PRIMARY_TEXT }, 'step-2')
      .to(`.${CLASSES.OVERLAY}`, { duration: .2, ease: Back.easeIn.config(4), "--after-scale": 0 }, 'step-2')
      .to(`.${CLASSES.OVERLAY}`, { duration: .2, ease: Power3.easeInOut, "--background-size": 0}, 'step-2');
  }

  const getSize = () => {
    return container.current?.getBoundingClientRect()?.width ?? 0;
  }
  return (
    <button ref={container} type="button" className={CLASSES.HOST} role="tab" aria-selected={active} aria-controls={`${id}-panel`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
      <div className={CLASSES.OVERLAY}>{children}</div>
      {children}
    </button>
  );
}