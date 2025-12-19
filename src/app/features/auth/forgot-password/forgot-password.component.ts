import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  template: `
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <!-- Background (même style) -->
      <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-yellow/20 via-primary-pink/20 to-accent-lavender/20"></div>
        <div class="absolute top-20 left-20 w-72 h-72 bg-primary-pink/30 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-primary-yellow/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div class="max-w-md w-full relative z-10" data-aos="fade-up">
        <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
          
          <!-- Icon -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-primary-pink/10 rounded-full mb-4">
              <svg class="w-10 h-10 text-primary-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            
            <h2 class="text-3xl font-heading font-bold text-neutral-900 mb-2">
              Mot de passe oublié ? 🔐
            </h2>
            <p class="text-neutral-600">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>

          <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()" class="space-y-6">
            
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-semibold text-neutral-700 mb-2">
                Email
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  placeholder="votre.email@exemple.com"
                  class="input-field pl-12"
                  [class.border-error]="email?.invalid && email?.touched">
              </div>
              
              <div *ngIf="email?.invalid && email?.touched" class="mt-2 text-sm text-error">
                <p *ngIf="email?.errors?.['required']">L'email est requis</p>
                <p *ngIf="email?.errors?.['email']">Email invalide</p>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="loading"
              class="w-full btn-primary bg-gradient-to-r from-primary-pink to-primary-coral hover:from-primary-coral hover:to-primary-pink text-white py-4 rounded-xl font-semibold text-lg shadow-pink hover:shadow-xl transition-all duration-300">
              
              <span *ngIf="!loading">Envoyer le lien</span>
              <div *ngIf="loading" class="flex items-center justify-center gap-2">
                <div class="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Envoi...</span>
              </div>
            </button>
          </form>

          <!-- Back to Login -->
          <div class="mt-8 text-center">
            <button
              (click)="goToLogin()"
              class="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-coral transition-colors duration-300">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Retour à la connexion
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    // Simuler l'envoi (à remplacer par un vrai service)
    setTimeout(() => {
      this.loading = false;
      this.notificationService.success(
        'Un email de réinitialisation a été envoyé à votre adresse',
        'Email envoyé'
      );
      this.router.navigate(['/auth/login']);
    }, 2000);
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}