import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ReviewService } from '../../services/review';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  user: any;
  reviews: any[] = [];

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {

    this.user = this.authService.getUser();

    this.reviewService.getMyReviews().subscribe({
      next: (data: any) => {
        this.reviews = data.reviews || data;
      },
      error: (err) => console.error(err)
    });

  }

}