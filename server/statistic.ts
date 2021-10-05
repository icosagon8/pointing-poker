import { GameStatisticModel } from './models/staticticModel';

const gameStatistic: GameStatisticModel[] = [];

export const addGameStat = (stat: GameStatisticModel): void => {
  gameStatistic.push(stat);
};

export const getStat = (room: string): GameStatisticModel[] => gameStatistic.filter((stat) => stat.roomId === room);
