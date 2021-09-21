export default interface GameCardType {
  title: string;
  value: string;
  id: string;
  setCurrentId?: React.Dispatch<React.SetStateAction<string>>;
  className?: string | null;
  cardSelection?: boolean;
  lobbyPage?: boolean;
}
