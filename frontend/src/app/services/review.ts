import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private API_URL = 'http://localhost:5000/api/reviews';

  constructor(private http: HttpClient) {}

  getReviewsByMovie(movieId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_URL}/movie/${movieId}`);
  }

  getReviews(): Observable<any[]> {
  return this.http.get<any[]>(this.API_URL);
}
  addReview(movieId: string, rating: number, comment: string): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const reviewData = {
      movie: movieId,
      rating: rating,
      comment: comment
    };

    return this.http.post(this.API_URL, reviewData, { headers });
  }

  getMyReviews() {
    const token = localStorage.getItem('token');

    return this.http.get(`${this.API_URL}/my`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

 getReviewById(reviewId: string) {
  const token = localStorage.getItem('token');

  return this.http.get(`${this.API_URL}/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

  updateReview(reviewId: string, rating: number, comment: string) {
    const token = localStorage.getItem('token');

    return this.http.put(
      `${this.API_URL}/${reviewId}`,
      { rating, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
  deleteReview(reviewId: string) {
    const token = localStorage.getItem('token');

    return this.http.delete(`${this.API_URL}/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}