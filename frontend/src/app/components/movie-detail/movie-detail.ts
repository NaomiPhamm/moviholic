import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../../services/movie';
import { ReviewService } from '../../services/review';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css']
})
export class MovieDetail implements OnInit {

  movie: any;
  reviews: any[] = [];

  newRating = 0;
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private reviewService: ReviewService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMovieDetail();
  }

  loadMovieDetail() {
    const movieId = this.route.snapshot.paramMap.get('id');

    if (movieId) {
      this.movieService.getMovieById(movieId).subscribe({
        next: (data: any) => {
          this.movie = data.movie || data;
          this.changeDetector.detectChanges();
        },
        error: (err: any) => {
          console.error(err);
        }
      });

      this.loadReviews(movieId);
    }
  }

  loadReviews(movieId: string) {
    this.reviewService.getReviewsByMovie(movieId).subscribe({
      next: (data: any) => {
        this.reviews = data.reviews || data;
        this.changeDetector.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  submitReview() {
    const movieId = this.route.snapshot.paramMap.get('id');

    if (!movieId) {
      return;
    }

    this.reviewService.addReview(movieId, this.newRating, this.newComment).subscribe({
      next: () => {
        this.newRating = 0;
        this.newComment = '';
        this.loadReviews(movieId);
        this.loadMovieDetail();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}