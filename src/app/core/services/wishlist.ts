import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistKey = 'favoriteMovies';

  wishlistCount$ = new BehaviorSubject<number>(this.getWishlistCount());

  constructor() {}

  getWishlist(): any[] {
    const stored = localStorage.getItem(this.wishlistKey);
    return stored ? JSON.parse(stored) : [];
  }

  isInWishlist(id: number): boolean {
    return this.getWishlist().some((m) => m.id === id);
  }

  toggle(movie: any): void {
    let list = this.getWishlist();

    if (this.isInWishlist(movie.id)) {
      list = list.filter((m) => m.id !== movie.id);
    } else {
      list.push(movie);
    }

    localStorage.setItem(this.wishlistKey, JSON.stringify(list));
    this.wishlistCount$.next(list.length);
  }

  getWishlistCount(): number {
    return this.getWishlist().length;
  }

  // لو حبيت تضيف تحديثات حسب اللغة (اختياري)
  // setLanguage(lang: string) {
  //   // ممكن تنفذ حاجة لو فيه حاجة مرتبطة بالعرض حسب اللغة
  // }
}
