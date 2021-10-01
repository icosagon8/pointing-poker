export interface SettingsModel {
  roomId: string;
  masterAsPlayer: boolean;
  changingCard: boolean;
  timerIsNeeded: boolean;
  scoreType: string;
  scoreTypeShort: string;
  timerHours: string;
  timerMinutes: string;
  cardsValue: GameCardsValue[];
}

interface GameCardsValue {
  id: string;
  value: string;
}
