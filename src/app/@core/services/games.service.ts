import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { db } from '../db/db';
import { Game, GameStatus } from '../models/Game';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiGame } from '../models/ApiGame';
import { popularGames, searchedGames, singleGame } from '../mock';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private httpClient: HttpClient) {}

  findAllUserGames(): Observable<Game[]> {
    return from(db.games.toArray());
  }

  findOneUserGames(id: number): Observable<Game[]> {
    console.log('find where id', id);
    return from(db.games.where({ id }).toArray());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findAllApiGames(filter: string): Observable<any[]> {
    // return this.httpClient.get<TwitchGame[]>(`${environment.apiUrl}/games`, {
    //   params: {
    //     key: environment.secretKey,
    //     exclude_collection: true,
    //     exclude_additions: true,
    //     search: filter
    //   }
    // });
    console.log('filter', filter);
    console.log('environment', environment);
    return of(searchedGames);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findAOneApiGames(id: number): Observable<any> {
    // return this.httpClient.get<TwitchGame[]>(`${environment.apiUrl}/games`, {
    //   params: {
    //     key: environment.secretKey,
    //     exclude_collection: true,
    //     exclude_additions: true,
    //     id: id
    //   }
    // });
    console.log('id', id);
    return of(singleGame);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findPopularGames(): Observable<any[]> {
    // return this.httpClient.get<TwitchGame[]>(`${environment.apiUrl}/games`, {
    //   params: {
    //     key: environment.secretKey,
    //     platforms: [187, 186, 7],
    //     ordering: '-metacritic',
    //     page_size: 9,
    //     exclude_collection: true,
    //     exclude_additions: true,
    //     dates: '2014-01-01,2050-12-31'
    //   }
    // });

    return of(popularGames);
  }

  addGameToLibrary(game: Game, status: GameStatus) {
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

  removeGameToLibrary(game: Game) {
    return from(db.games.delete(game.id!));
  }
}
