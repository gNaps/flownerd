import { Component } from '@angular/core';
import { InputTextComponent } from '../../@components/forms/input-text/input-text.component';
import { ButtonComponent } from '../../@components/forms/button/button.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { markFormAsTouched } from '../../@core/utils';
import { AuthService } from '../../@core/services/auth.service';
import { User } from '../../@core/models/User';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    InputTextComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService) {}

  onLogin() {
    markFormAsTouched(this.loginForm);

    if (this.loginForm.valid) {
      const user = { ...this.loginForm.value } as User;
      this.authService.signIn(user);
    }
  }
}
