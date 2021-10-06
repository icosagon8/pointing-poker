export interface IssueModel {
  id: string;
  title: string;
  link: string;
  priority: PriorityEnum;
  roomId: string;
  current: boolean;
  description: string;
  score?: string;
  isResult?: boolean;

export enum PriorityEnum {
  low = 'low',
  middle = 'middle',
  hight = 'hight',
}
