import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router,
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Vérifier si l'utilisateur est authentifié
    if (!this.authService.isAuthenticated || this.authService.isTokenExpired()) {
      this.notificationService.warning('Veuillez vous connecter pour accéder à cette page', 'Accès refusé');
      return this.router.createUrlTree(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
    }

    // Vérifier si l'utilisateur est admin
    const currentUser = this.authService.currentUserValue;
    if (currentUser?.role === UserRole.ADMIN) {
      return true;
    }

    // Afficher une notification et rediriger
    this.notificationService.error('Vous n\'avez pas les permissions nécessaires', 'Accès interdit');
    return this.router.createUrlTree(['/']);
  }
}