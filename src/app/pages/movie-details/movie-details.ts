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
  isLoading = true;
  isFavorite = false;
  private langSub?: Subscription;
  private transSub?: Subscription;
  private detailsSub?: Subscription;
  showTrailer = false;
  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoading = true;

    this.langSub = this.movieService.language$.subscribe(lang => {
      this.loadMovieData(id, lang);
    });
  }

  loadMovieData(id: number, lang: string) {
    this.isLoading = true;

    // أولاً نجيب تفاصيل الفيلم
    if (this.detailsSub) this.detailsSub.unsubscribe();
    this.detailsSub = this.movieService.getMovieDetails(id).subscribe({
      next: data => {
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
