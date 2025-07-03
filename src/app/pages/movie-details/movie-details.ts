import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie-service';
import { WishlistService } from '../../core/services/wishlist';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieVideos } from '../../movie-videos/movie-videos'; // استيراد الكومبوننت

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterModule, MovieVideos],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.css'],
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  movie: any;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
        this.movie = data;

        // بعدها نجيب الترجمات
        if (this.transSub) this.transSub.unsubscribe();
        this.transSub = this.movieService.getMovieTranslations(id).subscribe({
          next: (translationsData: any) => {
            const translation = translationsData.translations.find(
              (t: any) => t.iso_639_1 === lang
            );

            if (translation) {
              this.movie.translation = translation.data;
            } else {
              this.movie.translation = null;
            }

            this.isLoading = false;
            this.checkIfFavorite();
          },
          error: () => {
            this.movie.translation = null;
            this.isLoading = false;
            this.checkIfFavorite();
          }
        });
      },
      error: () => {
        this.isLoading = false;
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

  ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    this.transSub?.unsubscribe();
    this.detailsSub?.unsubscribe();
  }

}
