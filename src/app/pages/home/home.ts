import { Component, Inject, OnInit } from '@angular/core';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { MovieService } from '../../core/services/movie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MovieCard, CommonModule],
  templateUrl: './home.html',
styleUrls: ['./home.css']
})
export class Home implements OnInit {
  //private movieService = Inject(MovieService);

  movies: any[] = [];
  isLoading: boolean = true;
  page: number = 1;

  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
    this.fetchNowPlaying();
  }
  fetchNowPlaying(): void {
    this.isLoading = true;
    this.movieService.getNowPlaying(this.page).subscribe({
      next: (response: any) => {
        console.log(response.results);
        this.movies = response.results;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching movies', err);
        this.isLoading = false;
      },
    });
  }

  nextPage(): void {
    this.page++;
    this.fetchNowPlaying();
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.fetchNowPlaying();
    }
  }
}
