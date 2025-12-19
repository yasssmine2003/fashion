import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { NotificationService } from '@core/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  registerForm!: FormGroup;
  loading = false;
  showPassword = false;
  showConfirmPassword = false;
  returnUrl = '/';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initForm();
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
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[+]?[\d\s-]+$/)]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  /**
   * Validateur personnalisé pour la force du mot de passe
   */
  private passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumber;
    return valid ? null : { passwordStrength: true };
  }

  /**
   * Validateur personnalisé pour vérifier que les mots de passe correspondent
   */
  private passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  /**
   * Getters pour accéder aux contrôles
   */
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get phone() { return this.registerForm.get('phone'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get acceptTerms() { return this.registerForm.get('acceptTerms'); }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(field: 'password' | 'confirmPassword'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  /**
   * Calculer la force du mot de passe
   */
  getPasswordStrength(): number {
    const value = this.password?.value || '';
    let strength = 0;

    if (value.length >= 8) strength += 25;
    if (/[a-z]/.test(value)) strength += 25;
    if (/[A-Z]/.test(value)) strength += 25;
    if (/[0-9]/.test(value)) strength += 25;

    return strength;
  }

  /**
   * Obtenir la couleur de la barre de force
   */
  getPasswordStrengthColor(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 25) return 'bg-error';
    if (strength <= 50) return 'bg-warning';
    if (strength <= 75) return 'bg-info';
    return 'bg-success';
  }

  /**
   * Obtenir le texte de la force
   */
  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 25) return 'Faible';
    if (strength <= 50) return 'Moyen';
    if (strength <= 75) return 'Bon';
    return 'Fort';
  }

  /**
   * Soumettre le formulaire
   */
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { firstName, lastName, email, phone, password } = this.registerForm.value;

    this.authService.register({ firstName, lastName, email, phone, password }).subscribe({
      next: (response) => {
        this.loading = false;
        this.notificationService.registerSuccess();
        
        setTimeout(() => {
          this.router.navigate([this.returnUrl]);
        }, 500);
      },
      error: (error) => {
        this.loading = false;
        this.notificationService.error(
          error.message || 'Une erreur est survenue lors de l\'inscription',
          'Erreur'
        );
      }
    });
  }

  /**
   * Naviguer vers login
   */
  goToLogin(): void {
    this.router.navigate(['/auth/login'], {
      queryParams: { returnUrl: this.returnUrl }
    });
  }
}