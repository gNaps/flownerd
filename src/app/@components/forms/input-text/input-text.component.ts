import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  @Input() name = '';
  @Input() placeholder = '';
  @Input() control: AbstractControl = new UntypedFormControl();

  get formControl() {
    return this.control as FormControl;
  }
}
