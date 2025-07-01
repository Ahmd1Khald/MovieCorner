import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist'; // ضيف دي

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.css'],
})
export class MovieCard {
  @Input() movie: any;

  constructor(private wishlistService: WishlistService) {}

  toggleWishlist(movie: any, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.wishlistService.toggle(movie);
  }

  isInWishlist(id: number): boolean {
    return this.wishlistService.isInWishlist(id);
  }
}
