import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { db } from '../db/db';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  private _currentUser$: Subject<any> = new Subject();
  private _currentUser: any = null;
  currentUser$ = this._currentUser$.asObservable();

  get currentUser(): any {
    return this._currentUser;
  }

  constructor() {}

  async initializeUser() {
    console.log('CIAOOO');
    const user = await db.users.toArray();

    console.log('user', user);
    if (user && user.length) {
      this.setCurrentUser(user[0]);
    }
  }

  setCurrentUser(data: any) {
    this._currentUser$.next(data);
    this._currentUser = data;
  }

  signOut() {
    // this._currentUser$.next(null);
    // this._currentUser = null;
    // localStorage.removeItem(KEY_STORAGE_USER);
  }
}
