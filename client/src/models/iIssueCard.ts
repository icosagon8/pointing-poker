export default interface IssueCard {
  title: string;
  priority: string;
  role?: string;
  id?: number;
  setCurrentId?: any;
  className?: string | null;
}