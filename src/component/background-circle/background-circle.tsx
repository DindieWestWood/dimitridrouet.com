import { BackgroundShapeProps, CLASSES as GENERAL_CLASSES } from "../../assets/scripts/utils";
import "./background-circle.scss";

export default function BackgroundCircle({ }: BackgroundShapeProps) {
  const className = 'background-circle';
  return <div className={`${GENERAL_CLASSES.BACKGROUND_SHAPE} ${className}`}/>;
}