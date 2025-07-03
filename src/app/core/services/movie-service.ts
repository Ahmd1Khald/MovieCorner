import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private apiKey = '7217e28f54971cfe90064cc8e025df1f';

  // BehaviorSubject علشان نخزن اللغة الحالية ونسجل التغييرات
  private languageSubject = new BehaviorSubject<string>('en');
  language$ = this.languageSubject.asObservable();

  constructor(private http: HttpClient) {}

  setLanguage(lang: string) {
    this.languageSubject.next(lang);  // أبعت التحديث لكل المشتركين
  }

  getNowPlaying(page: number = 1): Observable<any> {
    return this.language$.pipe(
      switchMap(lang =>
        this.http.get(
          `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=${lang}&page=${page}`
        )
      )
    );
  }

  getMovieDetails(id: number): Observable<any> {
    return this.language$.pipe(
      switchMap(lang =>
        this.http.get(
          `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=${lang}`
        )
      )
    );
  }

  getRecommendations(id: number): Observable<any> {
    return this.language$.pipe(
      switchMap(lang =>
        this.http.get(
          `${this.baseUrl}/movie/${id}/recommendations?api_key=${this.apiKey}&language=${lang}`
        )
      )
    );
  }

  searchMovies(query: string, page: number = 1): Observable<any> {
    return this.language$.pipe(
      switchMap(lang =>
        this.http.get(
          `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=${lang}&query=${encodeURIComponent(query)}&page=${page}`
        )
      )
    );
  }

  // دالة جديدة لجلب ترجمات الفيلم
  getMovieTranslations(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/movie/${id}/translations?api_key=${this.apiKey}`);
  }

getMovieVideos(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`).pipe(
    map((res: any) => {
      const trailer = res.results.find((video: any) => video.type === 'Trailer' && video.site === 'YouTube');
      return trailer || null; 
    })
  );
}
}
