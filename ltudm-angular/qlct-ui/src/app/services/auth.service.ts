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
          if (response.accessToken) {
            localStorage.setItem('access_token', response.accessToken); // Store token if returned
          }
          if (response.idToken) {
            localStorage.setItem('id_token', response.idToken); // Store token if returned
          }
          if (response.refreshToken) {
            localStorage.setItem('refresh_token', response.refreshToken); // Store token if returned
          }
          if (response.userId) {
            localStorage.setItem('userid', response.userId); // Store userid if needed
          }
          if (response.username) {
            localStorage.setItem('username', response.username); // Store username if needed
          }
          localStorage.setItem('is_authenticated', 'true');
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
    return localStorage.getItem('is_authenticated') === 'true';
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('is_authenticated');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getIdToken(): string | null {
    return localStorage.getItem('id_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

}