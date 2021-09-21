export default interface GameCardType {
  title: string;
  value: string;
  location: string;
  id: string;
  setCurrentId?: React.Dispatch<React.SetStateAction<string>>;
  className?: string | null;
}
