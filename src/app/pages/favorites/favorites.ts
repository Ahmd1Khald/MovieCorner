import { Component, OnInit } from '@angular/core';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist';
import { MovieService } from '../../core/services/movie-service';

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

  constructor(private wishlistService: WishlistService, private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadFavorites();
  this.movieService.language$.subscribe(() => {
    this.loadFavorites();
  });
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.favoriteMovies = this.wishlistService.getWishlist();
    this.isLoading = false;
  }

  // ✅ دي اللي بناديها من الـ movie-card لما يحصل إزالة
  handleRemove(movieId: number): void {
    this.favoriteMovies = this.favoriteMovies.filter((m) => m.id !== movieId);
  }
}
