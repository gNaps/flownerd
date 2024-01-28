import { Injectable } from '@angular/core';
import { Game, GameStatus } from '../app/@core/models/Game';
import { User } from '../app/@core/models/User';
import { BehaviorSubject } from 'rxjs';

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
class AuthServiceMock {
  private _currentUser$: BehaviorSubject<User> = new BehaviorSubject({
    username: ''
  });
  currentUser$ = this._currentUser$.asObservable();
  currentUser: User | null = null;

  setCurrentUser(user: User) {
    this.currentUser = user;
  }
}

export default AuthServiceMock;
