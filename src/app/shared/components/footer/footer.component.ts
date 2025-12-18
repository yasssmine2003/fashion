import { Component } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  appName = environment.appName;
  socialMedia = environment.socialMedia;
  contact = environment.contact;

  // Newsletter
  newsletterEmail = '';

  /**
   * S'abonner à la newsletter
   */
  subscribeNewsletter(): void {
    if (this.newsletterEmail && this.isValidEmail(this.newsletterEmail)) {
      console.log('Newsletter subscription:', this.newsletterEmail);
      // TODO: Implémenter l'appel API
      this.newsletterEmail = '';
      alert('Merci pour votre inscription ! 🎉');
    }
  }

  /**
   * Valider l'email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}