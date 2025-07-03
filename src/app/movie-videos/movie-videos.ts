import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieService } from '../core/services/movie-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-videos',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="!video" class="no-videos">
No videos available</div>

<div *ngIf="video" class="video-wrapper">
  <h4 class="video-title">{{ video.name }}</h4>
  <iframe
    width="560"
    height="315"
    [src]="getSafeUrl(video.key)"
    frameborder="0"
    allowfullscreen
    title="Trailer Video">
  </iframe>
</div>


  `
})
export class MovieVideos implements OnInit {
  @Input() movieId!: number;

  constructor(
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) {}
video: any | null = null;

ngOnInit() {
  if (this.movieId) {
    this.movieService.getMovieVideos(this.movieId).subscribe(res => {
      this.video = res; // res هنا هي أول فيديو أو null
    });
  }
}


  getSafeUrl(key: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${key}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
