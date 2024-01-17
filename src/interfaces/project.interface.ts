import { ProjectTypeEnum } from "../enums/project-type.enum";

export default interface IProject {
  id: string;
  active: boolean;
  type: ProjectTypeEnum;
  name: string;
  description: string;
  company?: string;
  client?: string;
  period: string;
  roles: string[];
  imagesRefs: string[];
}