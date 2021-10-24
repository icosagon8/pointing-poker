export interface GameStatisticModel {
  roomId: string;
  issueId: string;
  results: StatisticResults[];
}

interface StatisticResults {
  cardId: string;
  percent: number;
}
