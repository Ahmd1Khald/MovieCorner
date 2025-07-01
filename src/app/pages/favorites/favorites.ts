import { Component, OnInit } from '@angular/core';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist'; // ✅ لازم السيرفيس

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MovieCard, CommonModule],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css'],
})
export class Favorites implements OnInit {
  favoriteMovies: any[] = [];
  isLoading = true;

  constructor(private wishlistService: WishlistService) {} // ✅ Inject the service

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.favoriteMovies = this.wishlistService.getWishlist(); // ✅ استخدم السيرفيس
    this.isLoading = false;
  }

  removeFromFavorites(movieId: number): void {
    this.favoriteMovies = this.favoriteMovies.filter((m) => m.id !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
    this.wishlistService.wishlistCount$.next(this.favoriteMovies.length); // ✅ تحديث العداد
  }
}
