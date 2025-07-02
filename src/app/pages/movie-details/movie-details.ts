import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie-service';
import { WishlistService } from '../../core/services/wishlist';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.css'],
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  isLoading: boolean = true;
  isFavorite: boolean = false;
  movieId: number = 0;

  // توصيات الفيلم
  recommendations: any[] = [];
  isLoadingRecommendations: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadMovieDetails();
    this.loadRecommendations();
  }

  loadMovieDetails(): void {
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (data) => {
        this.movie = data;
        this.isLoading = false;
        this.checkIfFavorite();
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
        this.isLoading = false;
      },
    });
  }

  loadRecommendations(): void {
    this.isLoadingRecommendations = true;
    this.movieService.getRecommendations(this.movieId).subscribe({
      next: (data) => {
        this.recommendations = data.results || [];
        this.isLoadingRecommendations = false;
      },
      error: (err) => {
        console.error('Error fetching recommendations:', err);
        this.isLoadingRecommendations = false;
      },
    });
  }

  checkIfFavorite(): void {
    this.isFavorite = this.wishlistService.isInWishlist(this.movie.id);
  }

  toggleFavorite(): void {
    this.wishlistService.toggle(this.movie);
    this.isFavorite = this.wishlistService.isInWishlist(this.movie.id);
  }

  addRecommendationToFavorites(movie: any): void {
    const stored = localStorage.getItem('favoriteMovies');
    let favorites = stored ? JSON.parse(stored) : [];

    const alreadyExists = favorites.some((fav: any) => fav.id === movie.id);
    if (!alreadyExists) {
      favorites.push(movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      alert('Added to favorites!');
    } else {
      alert('This movie is already in favorites!');
    }
  }

  navigateToMovie(movieId: number): void {
    window.location.href = `/movie/${movieId}`;
  }
}
