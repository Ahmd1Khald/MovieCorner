import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private _favoritesCount = new BehaviorSubject<number>(0);
  favoritesCount$ = this._favoritesCount.asObservable();

  constructor() {
    this.updateFavoritesCount();
  }

  updateFavoritesCount(): void {
    const stored = localStorage.getItem('favoriteMovies');
    const list = stored ? JSON.parse(stored) : [];
    this._favoritesCount.next(list.length);
  }

  getFavorites(): any[] {
    const stored = localStorage.getItem('favoriteMovies');
    return stored ? JSON.parse(stored) : [];
  }

  addToFavorites(movie: any): void {
    const list = this.getFavorites();
    const exists = list.some((m: any) => m.id === movie.id);
    if (!exists) {
      list.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(list));
      this.updateFavoritesCount();
    }
  }

  removeFromFavorites(movieId: number): void {
    let list = this.getFavorites();
    list = list.filter((m: any) => m.id !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(list));
    this.updateFavoritesCount();
  }
}
