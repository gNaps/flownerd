import { Injectable } from '@angular/core';
import { Subject, from, lastValueFrom, take, tap } from 'rxjs';
import { db } from '../db/db';
import { User } from '../models/User';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  async initializeUser() {
    const user = await db.users.toArray();
    if (user && user.length) {
      this.setCurrentUser(user[0]);
    }
  }

  setCurrentUser(data: User) {
    this._currentUser$.next(data);
    this._currentUser = data;
  }

  signIn(user: User) {
    from(
      db.users.add({
        username: user.username,
      })
    )
      .pipe(
        take(1),
        tap((data) => {
          this.setCurrentUser({ id: data, username: user.username });
          this.router.navigate(['/']);
        })
      )
      .subscribe();
  }

  signOut() {
    // this._currentUser$.next(null);
    // this._currentUser = null;
    // localStorage.removeItem(KEY_STORAGE_USER);
  }
}
