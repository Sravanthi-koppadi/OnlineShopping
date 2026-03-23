import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './authmodel.html',
  styleUrls: ['./authmodel.css']
})
export class AuthModalComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  // --- State Signals ---
  isLoginMode = signal(true);
  isLoading = signal(false); // For button loading states
  hasError = signal(false);  // For the "shake" animation trigger

  username = '';
  password = '';

  toggleMode() {
    this.isLoginMode.update(val => !val);
    this.hasError.set(false); // Reset errors when switching modes
  }

  onSubmit() {
    if (!this.username || !this.password) return;

    this.isLoading.set(true);
    this.hasError.set(false);

    // Simulate a brief "Vault Encryption" delay for premium feel
    setTimeout(() => {
      if (this.isLoginMode()) {
        this.handleLogin();
      } else {
        this.handleSignup();
      }
      this.isLoading.set(false);
    }, 800); 
  }

  private handleLogin() {
    this.authService.login(this.username);

    if (this.authService.currentUser()) {
      // Success: Navigate to home
      this.router.navigate(['/']);
    } else {
      // Failure: Trigger shake animation
      this.triggerError();
    }
  }

  private handleSignup() {
    // Basic Signup Logic: In a real app, you'd call authService.register()
    this.authService.login(this.username);
    this.router.navigate(['/']);
  }

  private triggerError() {
    this.hasError.set(true);
    // Reset the shake after animation finishes so it can be triggered again
    setTimeout(() => this.hasError.set(false), 500);
  }
}