import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextComponent } from '../../@components/forms/input-text/input-text.component';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, iif, of, switchMap, tap } from 'rxjs';
import { GamesService } from '../../@core/services/games.service';
import { CommonModule } from '@angular/common';
import { GameListComponent } from '../../@components/game-list/game-list.component';
import { Game } from '../../@core/models/Game';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputTextComponent, CommonModule, GameListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  games: Game[] = [];
  popularGames: Game[] = [];

  searchControl = new FormControl('');

  private games$: Subject<string | null> = new Subject();
  private popularGames$: Subject<void> = new Subject();

  get searchValue() {
    return this.searchControl.value;
  }

  constructor(
    private router: Router,
    private gamesService: GamesService
  ) {
    this.searchControl.valueChanges
      .pipe(
        takeUntilDestroyed(),
        debounceTime(500),
        tap((v) => this.loadFilteredGames(v))
      )
      .subscribe();

    this.popularGames$
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => this.gamesService.findPopularGames()),
        tap((games) => (this.popularGames = [...games]))
      )
      .subscribe();

    this.games$
      .pipe(
        takeUntilDestroyed(),
        switchMap((filter) =>
          iif(
            () => !!filter,
            this.gamesService.findAllApiGames(filter!),
            of([])
          )
        ),
        tap((games) => (this.games = [...games]))
      )
      .subscribe();
  }

  ngOnInit() {
    this.loadPopularGames();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  loadPopularGames() {
    this.popularGames$.next();
  }

  loadFilteredGames(filter: string | null) {
    this.games$.next(filter);
  }
}
