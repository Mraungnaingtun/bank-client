import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastService.showError('Please fill in all required fields.');
      return;
    }

    const { username, password } = this.loginForm.value;
    this.login(username, password);
    // this.authService.login(username, password).subscribe(
    //   () => {
    //     this.toastService.showSuccess('Login successful!');
    //     this.router.navigate(['/user']);
    //   },
    //   (error) => {
    //     this.toastService.showError('Login failed. Please try again.');
    //   }
    // );
  }


  async login(username: string, password: string) {
    try {
      const response = await this.authService.login(username, password);
      this.toastService.showSuccess('Login successful!');
      this.router.navigate(['/user']);
      console.log(response);

    } catch (error) {

      // Handle login error here
      console.error('Login failed:', error);
      
    }
  }

}
