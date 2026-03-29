import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css',
})
export class ForgotpasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  stepNumber: WritableSignal<number> = signal(1);

  forgotPasswordForm!: FormGroup;
  verifyResetCodeForm!: FormGroup;
  resetPasswordForm!: FormGroup;

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.forgotPasswordForm = this.fb.group({
      email: [null, [Validators.required]],
    });
    this.verifyResetCodeForm = this.fb.group({
      resetCode: [null, [Validators.required]],
    });
    this.resetPasswordForm = this.fb.group({
      email: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
    });
  }

  forgotPassword() {
    console.log(this.forgotPasswordForm.value);
    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (res) => {
        this.stepNumber.set(2);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  verifyResetCode() {
    console.log(this.verifyResetCodeForm.value);

    this.authService.verifyResetCode(this.verifyResetCodeForm.value).subscribe({
      next: (res) => {
        this.stepNumber.set(3);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  resetPassword() {
    console.log(this.resetPasswordForm.value);

    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
