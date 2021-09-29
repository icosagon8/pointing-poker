import { IssueModel } from './models/IssueModel';

const issues: IssueModel[] = [];

const setCurrentIssue = (room: string): void => {
  const issuesInRoom = issues.filter((item) => item.roomId === room);
  const checkIssue = issuesInRoom.some((item) => item.current);
  if (issuesInRoom.length && !checkIssue) {
    issuesInRoom[0].current = true;
  }
};

export const addIssue = (issue: IssueModel): IssueModel => {
  issues.push(issue);
  setCurrentIssue(issue.roomId);
  return issue;
};

export const editIssue = ({ title, priority }: IssueModel, id: string): IssueModel => {
  const issue = issues.find((item) => item.id === id) as IssueModel;
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
    setCurrentIssue(room);
    return deleteItemIssue;
  }
  return undefined;
};

export const setCurrentIssueClick = (id: string): void => {
  for (let i = issues.length - 1; i >= 0; i -= 1) {
    issues[i].current = false;
    if (issues[i].id === id) issues[i].current = true;
  }
};

export const nextIssue = (room: string): void => {
  const issuesInRoom = issues.filter((item) => item.roomId === room);
  const maxIndex = issuesInRoom.length - 1;
  const index = issuesInRoom.findIndex((issue) => issue.current);
  if (issuesInRoom[index + 1] || index < maxIndex) {
    issuesInRoom[index].current = false;
    issuesInRoom[index + 1].current = true;
  }
};

export const deleteIssuesInRoom = (room: string): void => {
  for (let i = issues.length - 1; i >= 0; i -= 1) {
    if (issues[i].roomId === room) issues.splice(i, 1);
  }
};

export const getIssues = (room: string): IssueModel[] => issues.filter((issue) => issue.roomId === room);
