import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          if (error.status === 401) {
            errorMessage = 'Unauthorized. Please login again.';
            localStorage.clear();
            this.router.navigate(['/login']);
          } else if (error.status === 404) {
            errorMessage = error.error || 'Resource not found';
          } else if (error.status === 400) {
            errorMessage = error.error || 'Bad request';
          } else if (error.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else {
            errorMessage = error.error || error.message;
          }
        }
        
        this.snackBar.open(errorMessage, 'Close', { duration: 4000 });
        return throwError(() => error);
      })
    );
  }
}
