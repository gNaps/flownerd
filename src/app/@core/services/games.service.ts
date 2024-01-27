import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { db } from '../db/db';
import { Game } from '../models/Game';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiGame } from '../models/ApiGame';
import { popularGames, searchedGames } from '../mock';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor(private httpClient: HttpClient) {}

  findUserGames(): Observable<Game[]> {
    return from(db.games.toArray());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  findTwitchGames(filter: string): Observable<any[]> {
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
}
