import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMsg: WritableSignal<string> = signal('');
  successMsg: WritableSignal<string> = signal('');

  loginForm!: FormGroup;

  isHidden: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),
        ],
      ],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.errorMsg.set('');
          this.successMsg.set(`${res.message} , logged in successfully`);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);

          this.authService.isLoggedIn.set(true);
        },
        error: (err) => {
          console.log(err);
          this.successMsg.set('');
          this.errorMsg.set(err.error.message);
        },
      });
    }
  }
}
