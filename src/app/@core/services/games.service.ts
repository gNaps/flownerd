import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { db } from '../db/db';
import { Game, GameResponse, GameStatus } from '../models/Game';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private httpClient: HttpClient) {}

  findAllUserGames(): Observable<Game[]> {
    return from(db.games.toArray());
  }

  findOneUserGames(id: number): Observable<Game[]> {
    return from(db.games.where({ id }).toArray());
  }

  findAllApiGames(filter: string): Observable<Game[]> {
    return this.httpClient
      .get<GameResponse>(`${environment.apiUrl}/games`, {
        params: {
          key: environment.secretKey,
          exclude_collection: true,
          exclude_additions: true,
          search: filter
        }
      })
      .pipe(map((data) => data.results));
  }

  findAOneApiGames(id: number): Observable<Game> {
    return this.httpClient.get<Game>(`${environment.apiUrl}/games/${id}`, {
      params: {
        key: environment.secretKey
      }
    });
  }

  findPopularGames(): Observable<Game[]> {
    return this.httpClient
      .get<GameResponse>(`${environment.apiUrl}/games`, {
        params: {
          key: environment.secretKey,
          platforms: [187, 186, 7],
          ordering: '-metacritic',
          page_size: 9,
          exclude_collection: true,
          exclude_additions: true,
          dates: '2014-01-01,2050-12-31'
        }
      })
      .pipe(map((data) => data.results));
  }

  addGame(game: Game, status: GameStatus) {
    return from(
      db.games.add({
        id: game.id,
        name: game.name,
        background_image: game.background_image,
        metacritic: game.metacritic,
        status: status
      })
    );
  }

  updateGame(game: Game, status: GameStatus) {
    return from(
      db.games.update(game.id!, {
        status: status
      })
    );
  }

  removeGame(game: Game) {
    return from(db.games.delete(game.id!));
  }
}
