import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '7217e28f54971cfe90064cc8e025df1f';

  constructor(private http: HttpClient) {}

  getNowPlaying(page: number = 1): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&page=${page}`
    );
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getRecommendations(id: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/movie/${id}/recommendations?api_key=${this.apiKey}`
    );
  }
}
