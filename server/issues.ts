import { IssueModel } from './models/IssueModel';

const issues: IssueModel[] = [];

export const addIssue = (issue: IssueModel, room: string): IssueModel => {
  issues.push(issue);
  const issuesInRoom = issues.filter((item) => item.roomId === room);
  const checkIssue = issuesInRoom.filter((item) => item.current === true);
  if (checkIssue.length === 0) {
    issuesInRoom[0].current = true;
  }
  return issue;
};

export const editIssue = ({ title, priority }: IssueModel, id: string): IssueModel => {
  const index = issues.findIndex((issue) => issue.id === id);
  const issue = issues[index];
  issue.title = title;
  issue.priority = priority;
  return issue;
};

export const getIssue = (id: string): IssueModel => {
  const issue = issues.find((currentIssue) => currentIssue.id === id) as IssueModel;
  return issue;
};

export const deleteIssue = (id: string, room: string): IssueModel | undefined => {
  const index = issues.findIndex((issue) => issue.id === id);
  if (index !== -1) {
    const deleteItemIssue = issues.splice(index, 1)[0];
    const issuesInRoom = issues.filter((item) => item.roomId === room);
    const checkIssue = issuesInRoom.filter((item) => item.current === true);
    if (checkIssue.length === 0) {
      issues[0].current = true;
    }
    return deleteItemIssue;
  }
  return undefined;
};

export const setCurrentIssue = (id: string): void => {
  for (let i = issues.length - 1; i >= 0; i -= 1) {
    issues[i].current = false;
    if (issues[i].id === id) issues[i].current = true;
  }
};

export const nextIssue = (room: string): void => {
  const issuesInRoom = issues.filter((item) => item.roomId === room);
  const maxIndex = issuesInRoom.length - 1;
  const index = issuesInRoom.findIndex((issue) => issue.current === true);
  if (index < maxIndex) {
    issuesInRoom[index].current = false;
    issuesInRoom[index + 1].current = true;
  }
};

export const getIssues = (room: string): IssueModel[] => issues.filter((issue) => issue.roomId === room);

// export const checkRoom = (room: string): boolean => users.some((user: UserModel) => user.room === room);
