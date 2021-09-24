import { IssueModel } from './models/IssueModel';

const issues: IssueModel[] = [];

export const addIssue = ({ id, title, priority, roomId }: IssueModel): IssueModel => {
  const issue = { id, title, priority, roomId };
  issues.push(issue);
  return issue;
};

export const getIssue = (id: string): IssueModel => {
  const issue = issues.find((currentIssue) => currentIssue.id === id) as IssueModel;
  return issue;
};

export const deleteIssue = (id: string): IssueModel | undefined => {
  const index = issues.findIndex((issue) => issue.id === id);
  if (index !== -1) return issues.splice(index, 1)[0];
  return undefined;
};

export const getIssues = (room: string): IssueModel[] => issues.filter((issue) => issue.roomId === room);

// export const checkRoom = (room: string): boolean => users.some((user: UserModel) => user.room === room);
