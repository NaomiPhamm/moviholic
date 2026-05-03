import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-edit.html',
  styleUrls: ['./movie-edit.css']
})
export class MovieEdit implements OnInit {

  movie: any;

  title = '';
  genre = '';
  releaseYear = 0;
  director = '';
  description = '';
  posterUrl = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');

    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe({
        next: (data: any) => {
          this.movie = data.movie || data;

          this.title = this.movie.title;
          this.genre = this.movie.genre;
          this.releaseYear = this.movie.releaseYear;
          this.director = this.movie.director;
          this.description = this.movie.description;
          this.posterUrl = this.movie.posterUrl;

          this.changeDetector.detectChanges();
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
  }

  updateMovie() {
    if (!this.movie) {
      return;
    }

    const movieData = {
      title: this.title,
      genre: this.genre,
      releaseYear: this.releaseYear,
      director: this.director,
      description: this.description,
      posterUrl: this.posterUrl
    };

    this.movieService.updateMovie(this.movie._id, movieData).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  deleteMovie() {
    if (!this.movie) {
      return;
    }

    this.movieService.deleteMovie(this.movie._id).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}