import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../@core/services/auth.service';
import { GamesService } from '../../@core/services/games.service';
import { User } from '../../@core/models/User';
import { Game, GameStatus, gameStatus } from '../../@core/models/Game';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, switchMap, take, tap } from 'rxjs';
import { TopbarComponent } from '../../@components/topbar/topbar.component';
import { GameListComponent } from '../../@components/game-list/game-list.component';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../@components/forms/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [TopbarComponent, GameListComponent, ButtonComponent]
})
export class HomeComponent implements OnInit {
  currentUser?: Partial<User>;
  games?: Game[];
  filteredGames?: Game[];
  gameStatus = gameStatus;

  activeFilters: Record<string, boolean> = {
    [GameStatus.COMPLETED]: false,
    [GameStatus.IN_PROGRESS]: false,
    [GameStatus.PERFECT]: false,
    [GameStatus.TO_BUY]: false,
    [GameStatus.TO_PLAY]: false,
    all: true
  };
  activeFiltersArray: string[] = [];

  private games$: Subject<void> = new Subject();

  get perfectGames() {
    return this.games?.filter((g) => g.status === GameStatus.PERFECT);
  }

  get completedGames() {
    return this.games?.filter((g) => g.status === GameStatus.COMPLETED);
  }

  get inProgressGames() {
    return this.games?.filter((g) => g.status === GameStatus.IN_PROGRESS);
  }

  get toBuyGames() {
    return this.games?.filter((g) => g.status === GameStatus.TO_BUY);
  }

  get toPlayGames() {
    return this.games?.filter((g) => g.status === GameStatus.TO_PLAY);
  }

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
        tap((games) => {
          this.games = [...games];
          this.filteredGames = [...games];
        })
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

  setFilter(filter: GameStatus | 'all') {
    if (filter !== 'all') {
      this.activeFilters[filter] = !this.activeFilters[filter];
      this.activeFiltersArray = this.activeFilters[filter]
        ? [...this.activeFiltersArray, filter]
        : [...this.activeFiltersArray].filter((f) => f !== filter);
      this.activeFilters['all'] = !this.activeFiltersArray.length;
    } else {
      for (const f in this.activeFilters) {
        this.activeFilters[f] = false;
      }
      this.activeFilters['all'] = true;
      this.activeFiltersArray = [];
    }

    this.filterGames();
  }

  filterGames() {
    const filters: string[] = [];
    for (const f in this.activeFilters) {
      if (f !== 'all' && this.activeFilters[f]) {
        filters.push(f);
      }
    }

    if (filters.length) {
      this.filteredGames = [...(this.games || [])].filter((g) =>
        filters.includes(g.status!)
      );
    } else {
      this.filteredGames = [...(this.games || [])];
    }
  }
}
