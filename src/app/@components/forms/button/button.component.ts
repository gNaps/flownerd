import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() value = '';
  @Input() type = 'button';
  @Input() style: 'filled' | 'outline' = 'filled';

  @Output() click = new EventEmitter();

  onClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.click.emit();
  }
}
