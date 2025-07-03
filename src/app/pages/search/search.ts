import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie-service';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MovieCard,Navbar],
  templateUrl: './search.html',
  styleUrls: ['./search.css'],
})
export class Search implements OnInit {
  query: string = '';
  results: any[] = [];
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'] || '';
      if (this.query) {
        this.searchMovies(this.query);
      }
    });
  }

  searchMovies(query: string) {
    this.loading = true;
    this.error = '';
    this.movieService.searchMovies(query).subscribe({
      next: (res) => {
        this.results = res.results || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'حدث خطأ أثناء جلب النتائج';
        this.loading = false;
      }
    });
  }
}
