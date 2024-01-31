import { ReactNode } from "react";

export default interface ITab {
  id: string;
  label: string;
  content: ReactNode;
}