import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../../core/services/wishlist';
import { MovieService } from '../../../core/services/movie-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule , FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],  // صححت الاسم هنا من styleUrl إلى styleUrls
})
export class Navbar implements OnInit {
  wishlistCount: number = 0;

  constructor(
    private wishlistService: WishlistService,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.wishlistService.wishlistCount$.subscribe((count) => {
      this.wishlistCount = count;
    });
  }

onSearch(event: Event, query: string) {
  event.preventDefault();

  if (!query.trim()) {
    return;
  }

  // بدل ما تعمل بحث هنا، توجه المستخدم لصفحة البحث مع ارسال الكلمة في الرابط
this.router.navigate(['/search'], { queryParams: { q: query } });

}
}
