import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { API_ENDPOINTS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.AUTH.REGISTER, data, { responseType: 'text' });
  }

  login(credentials: any): Observable<any> {
    return this.http.post(API_ENDPOINTS.AUTH.LOGIN, credentials).pipe(
      tap((response: any) => {
        const user = {
          id: response.id,
          username: response.username,
          email: response.email,
          role: response.role
        };
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  refreshUser(): void {
    const user = this.getUserFromStorage();
    this.userSubject.next(user);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
