import Dexie, { Table } from 'dexie';
import { User } from '../models/User';
import { Game } from '../models/Game';

export class AppDB extends Dexie {
  users!: Table<User, number>;
  games!: Table<Game, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      users: '++id, name',
      games: '++id, twitch_id, name',
    });
  }
}

export const db = new AppDB();
