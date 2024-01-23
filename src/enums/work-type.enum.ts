export enum WorkTypeEnum {
  PROJECT = 'project',
  LAB = 'lab'
}

export const workTypeToDescription = (type: WorkTypeEnum): string => {
  switch (type) {
    case WorkTypeEnum.PROJECT:
      return 'A selection of my finest professional work.';
    case WorkTypeEnum.LAB:
      return 'A selection of my personal experimentation.';
    default:
      return `Unknown work type: there is no description yet for the type ${type}`;
  }  
}