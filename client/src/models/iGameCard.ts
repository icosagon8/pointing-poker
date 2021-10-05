export default interface GameCardType {
  title?: string;
  value: string;
  id: string;
  className?: string | null;
  cardSelection?: boolean;
  lobbyPage?: boolean;
  setGameCards?: (arr: GameCardType[]) => void;
  gameCards?: GameCardType[];
  setCurrentId?: (flag: string) => void;
}
