import { WorkTypeEnum } from "../enums/work-type.enum";

export default interface IWork {
  id: string;
  index: number;
  active: boolean;
  type: WorkTypeEnum;
  name: string;
  description: string;
  company?: string;
  client?: string;
  period: string;
  roles: string[];
  imagesRefs: string[];
}