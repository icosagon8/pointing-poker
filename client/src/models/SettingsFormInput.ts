import { GameCardsValue } from './GameCardValue';

export interface SettingsFormInput {
  roomId: string;
  masterAsPlayer: boolean;
  changingCard: boolean;
  timerIsNeeded: boolean;
  scoreType: string;
  scoreTypeShort: string;
  timerHours: string;
  timerMinutes: string;
  cardsValue: GameCardsValue[];
  cardSet: string;
}
