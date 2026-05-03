import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private API_URL = 'http://localhost:5000/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  getMovieById(id: string) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  addMovie(movieData: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.API_URL, movieData, { headers });
  }

  getMyMovies(): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(`${this.API_URL}/my`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  updateMovie(movieId: string, movieData: any): Observable<any> {
  const token = localStorage.getItem('token');

  return this.http.put(`${this.API_URL}/${movieId}`, movieData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

deleteMovie(movieId: string): Observable<any> {
  const token = localStorage.getItem('token');

  return this.http.delete(`${this.API_URL}/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
}