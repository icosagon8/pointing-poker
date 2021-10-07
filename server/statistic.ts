import { GameStatisticModel } from './models/staticticModel';

const gameStatistic: GameStatisticModel[] = [];

export const addGameStat = (stat: GameStatisticModel): void => {
  gameStatistic.push(stat);
};

export const getStat = (room: string): GameStatisticModel[] => gameStatistic.filter((stat) => stat.roomId === room);

export const deleteStat = (id: string): GameStatisticModel | undefined => {
  const index = gameStatistic.findIndex((gameStat) => gameStat.issueId === id);
  if (index !== -1) {
    const deleteItemStat = gameStatistic.splice(index, 1)[0];
    return deleteItemStat;
  }
  return undefined;
};
