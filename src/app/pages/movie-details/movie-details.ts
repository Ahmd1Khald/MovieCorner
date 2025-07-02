import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie-service';
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
  recommendations: any[] = [];
  isLoading: boolean = true;
  isLoadingRecommendations: boolean = false;
  isFavorite: boolean = false;
  movieId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Movie ID from route:', this.movieId);

    this.loadMovieDetails();
    this.loadRecommendations();
  }

  loadMovieDetails(): void {
    this.movieService.getMovieDetails(this.movieId).subscribe({
      next: (data) => {
        console.log('Movie details from API:', data);
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
        console.log('Recommendations from API:', data);
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
    const stored = localStorage.getItem('favoriteMovies');
    const favorites = stored ? JSON.parse(stored) : [];
    this.isFavorite = favorites.some((fav: any) => fav.id === this.movie.id);
  }

  addToFavorites(): void {
    const stored = localStorage.getItem('favoriteMovies');
    let favorites = stored ? JSON.parse(stored) : [];

    const alreadyExists = favorites.some(
      (fav: any) => fav.id === this.movie.id
    );
    if (!alreadyExists) {
      favorites.push(this.movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      this.isFavorite = true;
      alert('Added to favorites!');
    } else {
      alert('This movie is already in favorites!');
    }
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
    // سيتم التنقل عبر الرواتر
    window.location.href = `/movie/${movieId}`;
  }
}
