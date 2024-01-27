import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() name = '';
  @Input() placeholder = '';
  @Input() control: AbstractControl = new UntypedFormControl();
  @Input() icon?: TemplateRef<SVGElement>;

  get formControl() {
    return this.control as FormControl;
  }
}
