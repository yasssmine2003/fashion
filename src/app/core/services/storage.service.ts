import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Sauvegarder une donnée dans localStorage
   */
  set(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde dans localStorage:', error);
    }
  }

  /**
   * Récupérer une donnée depuis localStorage
   */
  get<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error('Erreur lors de la récupération depuis localStorage:', error);
      return null;
    }
  }

  /**
   * Supprimer une donnée de localStorage
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Erreur lors de la suppression depuis localStorage:', error);
    }
  }

  /**
   * Vider tout le localStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erreur lors du vidage de localStorage:', error);
    }
  }

  /**
   * Vérifier si une clé existe
   */
  has(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  /**
   * Obtenir toutes les clés
   */
  keys(): string[] {
    return Object.keys(localStorage);
  }

  /**
   * Obtenir la taille du localStorage en bytes
   */
  getSize(): number {
    let size = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        size += localStorage[key].length + key.length;
      }
    }
    return size;
  }
}