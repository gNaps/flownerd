import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiGame } from '../../@core/models/ApiGame';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GamesService } from '../../@core/services/games.service';
import { Game, GameStatus, gameStatus } from '../../@core/models/Game';
import { ButtonComponent } from '../../@components/forms/button/button.component';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export class GameDetailComponent {
  game!: ApiGame;
  gameId!: number;
  status?: GameStatus;

  apiGame$: Observable<ApiGame>;
  userGame$: Observable<Game[]>;

  gameStatus = gameStatus;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService
  ) {
    this.gameId = +this.route.snapshot.params['id'];
    this.apiGame$ = this.gamesService.findAOneApiGames(this.gameId);
    this.userGame$ = this.gamesService.findOneUserGames(this.gameId);

    combineLatest([this.apiGame$, this.userGame$])
      .pipe(
        takeUntilDestroyed(),
        tap(([apiData, userData]) => {
          console.log('userData', userData);
          this.game = {
            ...apiData,
            ...(userData && userData.length
              ? { status: userData[0].status, gameUserId: userData[0].id }
              : {})
          };

          console.log('this.game', this.game);
        })
      )
      .subscribe();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  setStatus(status: GameStatus) {
    console.log('hai scelto', status);
    this.gamesService
      .addGameToLibrary(this.game, status)
      .pipe(
        take(1),
        tap(() => this.router.navigate(['/']))
      )
      .subscribe();
  }

  remove() {
    console.log('remove this game from FLOW', this.game.id);
    this.gamesService
      .removeGameToLibrary(this.game!)
      .pipe(
        take(1),
        tap(() => this.router.navigate(['/']))
      )
      .subscribe();
  }
}
