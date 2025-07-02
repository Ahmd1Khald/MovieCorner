import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie-service';
import { WishlistService } from '../../core/services/wishlist'; // ✅ خليك محتفظ بيها
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
  isLoading = true; // ✅ خليك على تنسيق برانش جو
  isFavorite = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getMovieDetails(id).subscribe({
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

  checkIfFavorite(): void {
    this.isFavorite = this.wishlistService.isInWishlist(this.movie.id);
  }

  toggleFavorite(): void {
    this.wishlistService.toggle(this.movie);
    this.isFavorite = this.wishlistService.isInWishlist(this.movie.id); // ✅ تحديث شكل القلب
  }
}
