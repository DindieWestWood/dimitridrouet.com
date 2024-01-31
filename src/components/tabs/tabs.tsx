import { useState } from 'react';
import ITab from '../../interfaces/tab.interface';
import Tab from '../tab/tab';
import './tabs.scss';

export const CLASSES = {
  HOST: 'tabs',
  TABLIST: 'tabs-tablist'
}

export interface TabsProps {
  id: string;
  labelledBy: string;
  tabs: ITab[];
}

export default function Tabs({id, labelledBy, tabs}: TabsProps) {
  const [activeTab, setActiveTab] = useState<string>(tabs && tabs.length > 0 ? `${id}-${tabs[0].id}`: '');

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  }

  return (
    <div className={CLASSES.HOST}>
      <div role="tablist" className={CLASSES.TABLIST} aria-labelledby={labelledBy}>
        { tabs.map((tab, index) => <Tab key={`${id}-${tab.id}`} id={`${id}-${tab.id}`} active={activeTab === `${id}-${tab.id}`} onClick={handleTabClick}>{tab.label}</Tab>)}
      </div>
    </div>  
  );
}