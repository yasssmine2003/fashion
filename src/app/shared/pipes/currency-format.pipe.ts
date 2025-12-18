import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, showSymbol: boolean = true): string {
    if (value === null || value === undefined) {
      return '0';
    }

    // Formater le nombre avec des espaces comme séparateurs de milliers
    const formatted = value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    
    // Ajouter le symbole de la devise si demandé
    if (showSymbol) {
      return `${formatted} ${environment.currencySymbol}`;
    }
    
    return formatted;
  }
}