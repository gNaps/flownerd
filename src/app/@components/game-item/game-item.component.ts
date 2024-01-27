import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from '../../@core/models/Game';

@Component({
  selector: 'app-game-item',
  standalone: true,
  imports: [],
  templateUrl: './game-item.component.html',
  styleUrl: './game-item.component.scss'
})
export class GameItemComponent {
  @Input() game!: Game;
  @Input() showName = true;

  @Output() clickGame: EventEmitter<Game> = new EventEmitter();

  onClickGame(game: Game) {
    this.clickGame.emit(game);
  }
}
