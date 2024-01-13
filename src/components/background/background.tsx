import { ReactNode } from "react"
import "./background.scss"

const CLASSES = {
  BACKGROUND: "background"
}

export interface BackgroundProps {
  children: ReactNode;
}

export default function Background({children}: BackgroundProps) {
  return (
    <div className={CLASSES.BACKGROUND}>
      {children}
    </div>
  )
}