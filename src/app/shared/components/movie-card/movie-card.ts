import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist'; // ⬅️ استورد الخدمة

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  constructor(private wishlistService: WishlistService) {} // ⬅️ استخدم الخدمة هنا

  @Input() movie: any;

  // ✅ check if movie is in wishlist
  isInWishlist(id: number): boolean {
    return this.wishlistService.isInWishlist(id);
  }

  // ✅ toggle movie in wishlist
  toggleWishlist(movie: any, event: Event): void {
    event.stopPropagation(); // عشان مايفتحش صفحة التفاصيل
    event.preventDefault(); // عشان مايتنقلش في اللينك

    this.wishlistService.toggle(movie); // ⬅️ استخدم الخدمة بدل الشغل اليدوي
  }
}
