import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '../../services/review';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-review-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './review-detail.html',
  styleUrls: ['./review-detail.css']
})
export class ReviewDetail implements OnInit {

  review: any;

  rating = 0;
  comment = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const reviewId = this.route.snapshot.paramMap.get('id');

    if (reviewId) {
      this.reviewService.getReviewById(reviewId).subscribe({
        next: (data: any) => {
          this.review = data.review || data;

          this.rating = this.review.rating;
          this.comment = this.review.comment;

          this.changeDetector.detectChanges();
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
  }

  updateReview() {
    if (!this.review) {
      return;
    }

    this.reviewService.updateReview(this.review._id, this.rating, this.comment).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  deleteReview() {
    if (!this.review) {
      return;
    }

    this.reviewService.deleteReview(this.review._id).subscribe({
      next: () => {
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}