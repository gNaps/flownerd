import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@core/services/auth.service';
import { GamesService } from '../../@core/services/games.service';
import { User } from '../../@core/models/User';
import { Game } from '../../@core/models/Game';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, switchMap, take, tap } from 'rxjs';
import { TopbarComponent } from '../../@components/topbar/topbar.component';
import { GameListComponent } from '../../@components/game-list/game-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [TopbarComponent, GameListComponent]
})
export class HomeComponent implements OnInit {
  currentUser?: Partial<User>;
  games?: Game[];

  private games$: Subject<void> = new Subject();

  constructor(
    private authService: AuthService,
    private gamesService: GamesService,
    private router: Router
  ) {
    this.authService.currentUser$
      .pipe(
        take(1),
        tap((user) => (this.currentUser = { ...user }))
      )
      .subscribe();

    this.games$
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => this.gamesService.findAllUserGames()),
        tap((games) => (this.games = [...games]))
      )
      .subscribe();
  }

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.games$.next();
  }

  onAddGame() {
    this.router.navigate(['/search']);
  }
}
