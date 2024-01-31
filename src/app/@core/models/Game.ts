export enum GameStatus {
  PERFECT = 'PERFECT',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  TO_PLAY = 'TO_PLAY',
  TO_BUY = 'TO_BUY'
}

export const gameStatus = [
  {
    key: GameStatus.PERFECT,
    label: '100%',
    icon: '💯'
  },
  {
    key: GameStatus.COMPLETED,
    label: 'Completed',
    icon: '✅'
  },
  {
    key: GameStatus.IN_PROGRESS,
    label: 'In progress',
    icon: '⌛'
  },
  {
    key: GameStatus.TO_PLAY,
    label: 'To play',
    icon: '🔒'
  },
  {
    key: GameStatus.TO_BUY,
    label: 'To buy',
    icon: '🛒'
  }
];

export interface Game {
  id?: number;
  name?: string;
  background_image?: string;
  metacritic?: number;
  status?: GameStatus;
  description_raw?: string;
}

export interface GameResponse {
  results: Game[];
}
