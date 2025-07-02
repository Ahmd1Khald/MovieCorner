// ✅ movie-card.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  @Input() movie: any;
  @Output() removedFromWishlist = new EventEmitter<number>();

  constructor(public wishlistService: WishlistService) {}

  isInWishlist(id: number): boolean {
    return this.wishlistService.isInWishlist(id);
  }

  handleToggle(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    const isCurrentlyInWishlist = this.isInWishlist(this.movie.id);
    this.wishlistService.toggle(this.movie);

    if (isCurrentlyInWishlist) {
      this.removedFromWishlist.emit(this.movie.id);
    }
  }
}
