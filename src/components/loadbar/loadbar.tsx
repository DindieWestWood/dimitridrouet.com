import './loadbar.scss';
import { CLASSES as GENERAL_CLASSES } from '../../assets/scripts/utils';
const CLASSES = {
  HOST: 'loadbar'
}

export interface LoadbarProps {
  value: number;
}

export default function Loadbar({value}: LoadbarProps) {
  return (
    <div className={CLASSES.HOST} role='progressbar' aria-valuemin={0} aria-valuemax={0} aria-valuenow={value} aria-valuetext={`${value}%`}>
       <p className={GENERAL_CLASSES.DISPLAY} aria-hidden="true">{`${value}%`}</p>       
    </div>
  );
}