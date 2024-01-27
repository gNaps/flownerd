import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { db } from '../db/db';
import { Game } from '../models/Game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  constructor() {}

  findGames(): Observable<Game[]> {
    return from(db.games.toArray());
  }
}
