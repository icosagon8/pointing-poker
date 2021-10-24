import { GameCardsValue } from './GameCardsValue';

export interface SettingsModel {
  roomId: string;
  masterAsPlayer: boolean;
  admitNewUser: boolean;
  changingCard: boolean;
  timerIsNeeded: boolean;
  scoreType: string;
  scoreTypeShort: string;
  timerHours: string;
  timerMinutes: string;
  cardsValue: GameCardsValue[];
  cardSet: string;
}
