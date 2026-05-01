import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movies.html',
  styleUrls: ['./movies.css']
})
export class Movies implements OnInit {

  movies: any[] = [];

  constructor(
    private movieService: MovieService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (data: any[]) => {
        console.log('movies from API:', data);
        this.movies = data;
        this.changeDetector.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}