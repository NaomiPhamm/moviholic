import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ReviewService } from '../../services/review';
import { MovieService } from '../../services/movie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  user: any;

  reviews: any[] = [];
  visibleReviewCount = 3;

  myMovies: any[] = [];
  visibleMovieCount = 3;

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private movieService: MovieService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();

    this.reviewService.getMyReviews().subscribe({
      next: (data: any) => {
        this.reviews = data.reviews || data;
        this.changeDetector.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    this.movieService.getMyMovies().subscribe({
      next: (data: any) => {
        this.myMovies = data.movies || data;
        this.changeDetector.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  seeMoreReviews() {
    this.visibleReviewCount += 6;
  }

  seeMoreMovies() {
    this.visibleMovieCount += 6;
  }
}