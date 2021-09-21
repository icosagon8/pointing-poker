export default interface IssueCard {
  title: string;
  priority: string;
  role?: string;
  id: string;
  setCurrentId?: (currentId: string) => void;
  className?: string | null;
}