export default interface IssueCard {
  title: string;
  priority: string;
  role?: string;
  id?: string | undefined;
  setCurrentId?: React.Dispatch<React.SetStateAction<string | undefined>>
  className?: string | null;
}

