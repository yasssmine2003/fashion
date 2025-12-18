import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { 
  User, 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  UserRole 
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private readonly TOKEN_KEY = environment.jwtTokenKey;
  private readonly EXPIRATION_KEY = environment.jwtExpirationKey;

  // State management avec BehaviorSubject
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initialiser les subjects avec les valeurs du localStorage
    const storedUser = this.getUserFromStorage();
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(!!storedUser);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  /**
   * Getter pour l'utilisateur actuel
   */
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Vérifier si l'utilisateur est admin
   */
  get isAdmin(): boolean {
    return this.currentUserValue?.role === UserRole.ADMIN;
  }

  /**
   * Login
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.get<User[]>(`${this.API_URL}/users?email=${credentials.email}`).pipe(
      map(users => {
        const user = users[0];
        if (!user || user.password !== credentials.password) {
          throw new Error('Email ou mot de passe incorrect');
        }

        // Générer un faux JWT token (pour la simulation)
        const token = this.generateFakeJWT(user);
        const expiresIn = Date.now() + (24 * 60 * 60 * 1000); // 24h

        // Supprimer le password avant de retourner
        const { password, ...userWithoutPassword } = user;

        const authResponse: AuthResponse = {
          user: userWithoutPassword as User,
          token,
          expiresIn
        };

        return authResponse;
      }),
      tap(response => {
        // Stocker les infos d'authentification
        this.setSession(response);
      }),
      catchError(error => {
        console.error('Erreur de connexion:', error);
        return throwError(() => new Error('Email ou mot de passe incorrect'));
      })
    );
  }

  /**
   * Register
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Vérifier si l'email existe déjà
    return this.http.get<User[]>(`${this.API_URL}/users?email=${userData.email}`).pipe(
      map(users => {
        if (users.length > 0) {
          throw new Error('Cet email est déjà utilisé');
        }
        return users;
      }),
      // Créer le nouvel utilisateur
      map(() => {
        const newUser: Omit<User, 'id'> = {
          ...userData,
          role: UserRole.USER,
          avatar: `https://i.pravatar.cc/150?u=${userData.email}`,
          createdAt: new Date().toISOString()
        };
        return newUser;
      }),
      // Sauvegarder dans la DB
      map(newUser => this.http.post<User>(`${this.API_URL}/users`, newUser)),
      map(userObservable => {
        // Simuler la réponse
        const mockUser: User = {
          id: Math.floor(Math.random() * 10000),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: UserRole.USER,
          phone: userData.phone,
          avatar: `https://i.pravatar.cc/150?u=${userData.email}`,
          createdAt: new Date().toISOString()
        };

        const token = this.generateFakeJWT(mockUser);
        const expiresIn = Date.now() + (24 * 60 * 60 * 1000);

        const authResponse: AuthResponse = {
          user: mockUser,
          token,
          expiresIn
        };

        return authResponse;
      }),
      tap(response => {
        this.setSession(response);
      }),
      catchError(error => {
        console.error('Erreur d\'inscription:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout
   */
  logout(): void {
    // Supprimer les données du localStorage
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.EXPIRATION_KEY);
    localStorage.removeItem('currentUser');

    // Réinitialiser les subjects
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);

    // Rediriger vers login
    this.router.navigate(['/auth/login']);
  }

  /**
   * Vérifier si le token est expiré
   */
  isTokenExpired(): boolean {
    const expiration = localStorage.getItem(this.EXPIRATION_KEY);
    if (!expiration) return true;

    const expirationTime = parseInt(expiration, 10);
    return Date.now() >= expirationTime;
  }

  /**
   * Obtenir le token JWT
   */
  getToken(): string | null {
    if (this.isTokenExpired()) {
      this.logout();
      return null;
    }
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Stocker la session
   */
  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.EXPIRATION_KEY, authResponse.expiresIn.toString());
    localStorage.setItem('currentUser', JSON.stringify(authResponse.user));

    this.currentUserSubject.next(authResponse.user);
    this.isAuthenticatedSubject.next(true);
  }

  /**
   * Récupérer l'utilisateur du localStorage
   */
  private getUserFromStorage(): User | null {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson || this.isTokenExpired()) {
      return null;
    }
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }

  /**
   * Générer un faux JWT token (simulation)
   */
  private generateFakeJWT(user: User): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ 
      userId: user.id, 
      email: user.email, 
      role: user.role,
      exp: Date.now() + (24 * 60 * 60 * 1000)
    }));
    const signature = btoa('fake-signature');
    return `${header}.${payload}.${signature}`;
  }
}