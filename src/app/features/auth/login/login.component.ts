import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  loading = false;
  showPassword = false;
  returnUrl = '/';

  // Quick login credentials pour la démo
  demoCredentials = {
    admin: { email: 'admin@fashion.com', password: 'admin123' },
    user: { email: 'user@fashion.com', password: 'user123' }
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // Initialiser le formulaire
    this.initForm();

    // Récupérer l'URL de retour depuis les query params
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    // Si déjà connecté, rediriger
    if (this.authService.isAuthenticated) {
      this.router.navigate([this.returnUrl]);
    }
  }

  /**
   * Initialiser le formulaire avec validations
   */
  private initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  /**
   * Getters pour accéder aux contrôles du formulaire
   */
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Quick login avec credentials démo
   */
  quickLogin(type: 'admin' | 'user'): void {
    const credentials = this.demoCredentials[type];
    this.loginForm.patchValue(credentials);
    this.onSubmit();
  }

  /**
   * Soumettre le formulaire de connexion
   */
  onSubmit(): void {
    // Marquer tous les champs comme touched pour afficher les erreurs
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.loading = false;
        this.notificationService.loginSuccess(response.user.firstName);
        
        // Rediriger vers returnUrl ou home
        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 500);
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error(
          error.message || 'Email ou mot de passe incorrect',
          'Erreur de connexion'
        );
      }
    });
  }

  /**
   * Naviguer vers la page d'inscription
   */
  goToRegister(): void {
    this.router.navigate(['/auth/register'], {
      queryParams: { returnUrl: this.returnUrl }
    });
  }

  /**
   * Naviguer vers mot de passe oublié
   */
  goToForgotPassword(): void {
    this.router.navigate(['/auth/forgot-password']);
  }
}