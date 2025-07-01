import { Component, OnInit } from '@angular/core';
import { MovieCard } from '../../shared/components/movie-card/movie-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MovieCard, CommonModule],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css'],
})
export class Favorites implements OnInit {
  favoriteMovies: any[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;

    const stored = localStorage.getItem('favoriteMovies');
    this.favoriteMovies = stored ? JSON.parse(stored) : [];

    this.isLoading = false;
  }
}
