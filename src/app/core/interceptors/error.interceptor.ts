import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue';

        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          errorMessage = `Erreur: ${error.error.message}`;
        } else {
          // Erreur côté serveur
          switch (error.status) {
            case 400:
              errorMessage = 'Requête invalide';
              break;
            case 401:
              errorMessage = 'Non autorisé. Veuillez vous reconnecter';
              this.authService.logout();
              break;
            case 403:
              errorMessage = 'Accès interdit';
              break;
            case 404:
              errorMessage = 'Ressource non trouvée';
              break;
            case 500:
              errorMessage = 'Erreur serveur interne';
              break;
            case 503:
              errorMessage = 'Service temporairement indisponible';
              break;
            default:
              errorMessage = error.error?.message || `Erreur ${error.status}: ${error.statusText}`;
          }
        }

        // Afficher la notification d'erreur
        this.notificationService.error(errorMessage);

        // Retourner l'erreur pour que les composants puissent la gérer
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}