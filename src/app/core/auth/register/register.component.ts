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
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMsg: WritableSignal<string> = signal('');
  successMsg: WritableSignal<string> = signal('');

  registerForm!: FormGroup;

  isHidden: WritableSignal<boolean> = signal(true);
  isHiddenRe: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/),
          ],
        ],
        rePassword: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      },
      { validators: this.confirmPassword },
    );
  }

  confirmPassword(gp: AbstractControl) {
    let password = gp.get('password')?.value;
    let rePassword = gp.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.errorMsg.set('');
          this.successMsg.set(`${res.message} , account created successfully`);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
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
