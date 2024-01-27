import { Component, Input } from '@angular/core';
import { GameItemComponent } from '../game-item/game-item.component';
import { Router } from '@angular/router';
import { Game } from '../../@core/models/Game';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [GameItemComponent],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  @Input() games: Game[] = [];
  @Input() showName = true;

  constructor(private router: Router) {}

  onClickGame(game: Game) {
    this.router.navigate(['/game', game.id]);
  }
}
