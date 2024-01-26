import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() value = '';
  @Input() type = 'button';

  @Output() click = new EventEmitter();

  onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.click.emit();
  }
}
