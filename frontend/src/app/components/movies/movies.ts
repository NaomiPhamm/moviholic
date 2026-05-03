import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie';
import { ReviewService } from '../../services/review';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './movies.html',
  styleUrls: ['./movies.css']
})
export class Movies implements OnInit {

  movies: any[] = [];
  filteredMovies: any[] = [];
  topMovies: any[] = [];

  latestReviews: any[] = [];

  visibleMovieCount = 6;
  visibleReviewCount = 3;

  searchText = '';

  constructor(
    private movieService: MovieService,
    private reviewService: ReviewService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMovies();
    this.loadLatestReviews();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (data: any[]) => {
        this.movies = data;
        this.filteredMovies = data;

        this.topMovies = [...data]
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 3);

        this.changeDetector.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  loadLatestReviews() {
    this.reviewService.getReviews().subscribe({
      next: (data: any[]) => {
        this.latestReviews = data;
        this.changeDetector.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  filterMovies() {
    const keyword = this.searchText.toLowerCase();

    this.filteredMovies = this.movies.filter(movie =>
      movie.title.toLowerCase().includes(keyword) ||
      movie.genre.toLowerCase().includes(keyword) ||
      movie.director.toLowerCase().includes(keyword)
    );

    this.visibleMovieCount = 6;
    this.changeDetector.detectChanges();
  }

  seeMoreMovies() {
    this.visibleMovieCount += 6;
  }

  seeMoreReviews() {
    this.visibleReviewCount += 3;
  }
}