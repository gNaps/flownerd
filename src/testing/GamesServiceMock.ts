import { Injectable } from '@angular/core';
import { Game, GameStatus } from '../app/@core/models/Game';
import { popularGames, searchedGames, singleGame } from '../app/@core/mock';
import { of } from 'rxjs';

export const userGameMock: Game[] = [
  {
    id: 3328,
    name: 'The Witcher 3: Wild Hunt',
    background_image:
      'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
    metacritic: 92,
    status: GameStatus.COMPLETED
  }
];

@Injectable({
  providedIn: 'root'
})
class GamesServiceMock {
  findAllUserGames = async () => {
    return userGameMock;
  };

  findAllApiGames = async () => {
    return searchedGames;
  };

  findPopularGames = async () => {
    return popularGames;
  };

  findAOneApiGames = async () => {
    return singleGame;
  };

  findOneUserGames = async () => {
    return userGameMock;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addGame(game: Game, status: GameStatus) {
    return of({ id: 1 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateGame(game: Game, status: GameStatus) {
    return of({ id: 1 });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeGame(game: Game) {
    return of({ id: 1 });
  }
}

export default GamesServiceMock;
