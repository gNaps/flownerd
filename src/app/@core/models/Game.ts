export enum GameStatus {
  PERFECT = 'PERFECT',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  TO_PLAY = 'TO_PLAY',
  TO_BUY = 'TO_BUY'
}

export interface Game {
  id: number;
  twitch_id: number;
  name: string;
  cover: string;
  rating: number;
  status: GameStatus;
}
