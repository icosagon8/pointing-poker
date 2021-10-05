export interface IssueModel {
  id: string;
  title: string;
  priority: PriorityEnum;
  roomId: string;
  current: boolean;
  isResult?: boolean;
}

export enum PriorityEnum {
  low = 'low',
  middle = 'middle',
  hight = 'hight',
}
