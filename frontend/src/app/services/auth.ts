import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'https://moviholic.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
  return this.http.post(`${this.API_URL}/signup`, userData);
}
  

  login(userData: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, userData);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
   getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
}