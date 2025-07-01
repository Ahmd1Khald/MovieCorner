import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie-service';
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
  isLoading: boolean = true;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Movie ID from route:', id);

    this.movieService.getMovieDetails(id).subscribe({
      next: (data) => {
        console.log('Movie details from API:', data);
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
    const stored = localStorage.getItem('favoriteMovies');
    const favorites = stored ? JSON.parse(stored) : [];
    this.isFavorite = favorites.some((fav: any) => fav.id === this.movie.id);
  }

  addToFavorites(): void {
    const stored = localStorage.getItem('favoriteMovies');
    let favorites = stored ? JSON.parse(stored) : [];

    const alreadyExists = favorites.some(
      (fav: any) => fav.id === this.movie.id
    );
    if (!alreadyExists) {
      favorites.push(this.movie);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      this.isFavorite = true;
      alert('Added to favorites!');
    } else {
      alert('This movie is already in favorites!');
    }
  }
}
