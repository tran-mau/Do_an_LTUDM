import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'; 

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.error('API error:', error);
    return throwError(() => error);
  }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${this.apiUrl}/signin`, loginData, httpOptions)
      .pipe(
        tap(response => {
          // Store token in localStorage if server returns it
          if (response && response.token) {
            localStorage.setItem('auth_token', response.token);
          }
        }),
        catchError(this.handleError)
      );
  }

  signup(userData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${this.apiUrl}/signup`, userData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Updated to match what AWS Cognito expects
  verify(verificationData: {username: string, confirmationCode: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/confirm-signup`, verificationData)
      .pipe(
        catchError(this.handleError)
      );
  }

  resendVerificationEmail(username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resend-confirmation`, username )
      .pipe(
        catchError(this.handleError)
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('auth_token');
  }

  // Get auth token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}