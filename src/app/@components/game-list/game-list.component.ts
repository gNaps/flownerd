import { Component, Input } from '@angular/core';
import { ApiGame } from '../../@core/models/ApiGame';
import { GameItemComponent } from '../game-item/game-item.component';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [GameItemComponent],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export class GameListComponent {
  @Input() games: ApiGame[] = [];
}
