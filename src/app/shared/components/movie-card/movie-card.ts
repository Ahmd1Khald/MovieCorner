import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule,RouterModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css'
})
export class MovieCard {
constructor() {}

@Input() movie: any;
}
