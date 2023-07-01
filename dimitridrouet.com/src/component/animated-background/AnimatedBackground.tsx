import { useEffect, useRef } from 'react';
import './AnimatedBackground.scss';
import  { gsap } from 'gsap';
import tinycolor from 'tinycolor2';
import grainTexture from "../../assets/images/textures/grain.svg";

const CLASSNAME = "anim-bg";
const DEFAULT_COLOR = "#f8f7f6";

interface Zone {
  top: number,
  left: number,
  bottom: number,
  right: number
}

export interface AnimatedBackgroundProps {
  color?: string;
  shadeAmount?: number;
  rowsCount?: number;
  colsCount?: number;
}

export default function AnimatedBackground({color, shadeAmount = 10, rowsCount = 3, colsCount = 2}: AnimatedBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zones = getZones(rowsCount, colsCount);
    const colorOrDefault = color ? color : DEFAULT_COLOR
    gsap.set(bgRef.current, {
      //backgroundColor: colorOrDefault,
      backgroundImage: getRadialGradients(colorOrDefault, zones) + `, url(${grainTexture})`
    });
  }, []);

  function getRadialGradients(color: string, zones: Zone[]) {
    return zones.map((zone, index) => getRadialGradient(index, color, zone)).join(", ");
  }
  
  function getRadialGradient(index: number, color: string, zone: Zone) {
    gsap.to(bgRef.current, { [`--gradient-${index}-x`]: `random(${zone.left}, ${zone.right})%`, duration: `random(6, 10)`, repeat: -1, yoyo: true });
    gsap.to(bgRef.current, { [`--gradient-${index}-y`]: `random(${zone.top}, ${zone.bottom})%`, duration: `random(6, 10)`, repeat: -1, yoyo: true });
    return `radial-gradient(at var(--gradient-${index}-x) var(--gradient-${index}-y), ${getRandomShade(color, shadeAmount)}, transparent 70%)`
  }

  return (
    <div className={CLASSNAME} ref={bgRef}/>
  );
}

function getZones(rowsCount: number, colsCount: number): Zone[] {
  const zones: Zone[] = [];

  const percentageStepWidth = 100 / colsCount;
  const percentageStepHeight = 100 / rowsCount;

  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < colsCount; j++) {
      zones.push({
        top: percentageStepHeight * i,
        left: percentageStepWidth * j,
        bottom: percentageStepHeight * (i + 1),
        right: percentageStepWidth * (j + 1)
      });
    }
  }

  return zones;
}

function getRandomShade(color: string, shadeAmount: number) {
  return tinycolor(color).darken(gsap.utils.random(0, shadeAmount));
}


