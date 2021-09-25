export default interface IssueCard {
  title: string;
  priority: string;
  role?: string;
  id: string;
  setCurrentId?: React.Dispatch<React.SetStateAction<string>>
  className?: string | null;
}

