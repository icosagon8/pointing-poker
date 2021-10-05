export interface IssueModel {
  id: string;
  title: string;
  link: string;
  priority: PriorityEnum;
  roomId: string;
  current: boolean;
}

enum PriorityEnum {
  low = 'low',
  middle = 'middle',
  hight = 'hight',
}