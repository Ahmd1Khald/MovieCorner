import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieVideos } from './movie-videos';

describe('MovieVideos', () => {
  let component: MovieVideos;
  let fixture: ComponentFixture<MovieVideos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieVideos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieVideos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
