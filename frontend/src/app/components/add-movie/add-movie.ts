import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-movie.html',
  styleUrls: ['./add-movie.css']
})
export class AddMovie {

  title = '';
  genre = '';
  releaseYear = 0;
  director = '';
  description = '';
  posterUrl = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  addMovie() {
    const movieData = {
      title: this.title,
      genre: this.genre,
      releaseYear: this.releaseYear,
      director: this.director,
      description: this.description,
      posterUrl: this.posterUrl
    };

    this.movieService.addMovie(movieData).subscribe({
      next: () => {
        this.successMessage = 'Movie added successfully';
        this.errorMessage = '';

        this.router.navigate(['/movies']);
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Add movie failed';
        this.successMessage = '';
      }
    });
  }
}