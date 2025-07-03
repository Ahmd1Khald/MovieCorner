import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../core/services/movie-service';
import { WishlistService } from '../../core/services/wishlist';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieVideos } from '../../movie-videos/movie-videos';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieVideos,Navbar],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.css'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie: any;
  movieId!: number;
  lang: string = 'en';
  isFavorite: boolean = false;
  isLoading: boolean = true;
  isLoadingRecommendations: boolean = false;
  recommendations: any[] = [];
  showTrailer: boolean = false;

  // Subscriptions
  private routeSub!: Subscription;
  private detailsSub!: Subscription;
  private transSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishlistService: WishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.getMovieDetails(this.movieId);
    });
  }

  getMovieDetails(id: number): void {
    this.isLoading = true;

    this.detailsSub = this.movieService.getMovieDetails(id).subscribe({
      next: (data: any) => {
        this.movie = data;
        this.getMovieTranslations(id, this.lang);
      },
      error: () => {
        this.isLoading = false;
        console.error('Error fetching movie details');
      }
    });
  }

  getMovieTranslations(id: number, lang: string): void {
    if (this.transSub) this.transSub.unsubscribe();

    this.transSub = this.movieService.getMovieTranslations(id).subscribe({
      next: (translationsData: any) => {
        const translation = translationsData.translations.find(
          (t: any) => t.iso_639_1 === lang
        );

        this.movie.translation = translation ? translation.data : null;
        this.isLoading = false;
        this.checkIfFavorite();
      },
      error: () => {
        this.movie.translation = null;
        this.isLoading = false;
        this.checkIfFavorite();
      }
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

  navigateToMovie(movieId: number): void {
    this.router.navigate(['/movie', movieId]);
  }

  addRecommendationToFavorites(movie: any): void {
    this.wishlistService.toggle(movie);
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.transSub?.unsubscribe();
    this.detailsSub?.unsubscribe();
  }
}
