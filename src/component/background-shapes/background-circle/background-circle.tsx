import { BackgroundShapeProps, CLASSES as GENERAL_CLASSES } from "../../../assets/scripts/utils";
import "./background-circle.scss";

export const CLASSES = {
  HOST: "background-circle"
}

export default function BackgroundCircle({ width = "250px", height = "250px" }: BackgroundShapeProps) {
  return (
    <div className={`${GENERAL_CLASSES.BACKGROUND_SHAPE} ${CLASSES.HOST}`}  style={{width: width, height: height}}/>
  );
}