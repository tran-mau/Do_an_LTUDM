import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.status === 0) {
      // A client-side or network error occurred
      errorMessage = 'Network error occurred. Please check your connection or if the server is running.';
      console.error('Network error:', error.error);
    } else {
      // The backend returned an unsuccessful response code
      errorMessage = `Server returned code ${error.status}, error message: ${error.error}`;
      console.error('Backend error:', error.error);
    }

    return throwError(() => new Error(errorMessage));
  }

  showTransactionHistory(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Include if your API requires credentials
    };

    return this.http.get<any[]>(`${this.apiUrl}/transaction`, httpOptions)
      .pipe(
        retry(1), // Retry once before failing
        catchError(this.handleError)
      );
  }

  deleteTransaction(transactionId: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Include if your API requires credentials
    };

    return this.http.delete<any[]>(`${this.apiUrl}/transaction/remove?id=${transactionId}`, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateTransaction(transactionId: string, transactionData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Include if your API requires credentials
    };

    return this.http.put<any>(`${this.apiUrl}/transaction/update?id=${transactionId}`, transactionData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  getBalanceTransaction(): Observable<number> {
    const id = localStorage.getItem('userid');
    const token = localStorage.getItem('access_token');

    if (!id || !token) {
      return throwError(() => new Error('User ID or token is missing'));
    }
    console.log("id: ", `${this.apiUrl}/transactions/user/amount-in?userId=${id}`);

    return this.http.get<any>(`${this.apiUrl}/transactions/user/balance?userId=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAmountInTransaction(month: number, year: number): Observable<number> {
    const id = localStorage.getItem('userid');
    const token = localStorage.getItem('access_token');
    

    if (!id || !token) {
      return throwError(() => new Error('User ID or token is missing'));
    }
    // console.log("id: ", `${this.apiUrl}/transactions/user/amount-in?userId=${id}`);

    return this.http.get<any>(`${this.apiUrl}/transactions/user/amount-in?userId=${id}&month=${month}&year=${year}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  getAmountOutTransaction(month: number, year: number): Observable<number> {
    const id = localStorage.getItem('userid');
    const token = localStorage.getItem('access_token');

    if (!id || !token) {
      return throwError(() => new Error('User ID or token is missing'));
    }

    return this.http.get<any>(`${this.apiUrl}/transactions/user/amount-out?userId=${id}&month=${month}&year=${year}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  getListAmountInTransaction(): Observable<any[]> {
    const id = localStorage.getItem('userid');
    const token = localStorage.getItem('access_token');

    if (!id || !token) {
      return throwError(() => new Error('User ID or token is missing'));
    }
    console.log(`${this.apiUrl}/transactions/user/get-list-amount-in?userId=${id}`)

    return this.http.get<any[]>(`${this.apiUrl}/transactions/user/get-list-amount-in?userId=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  getListAmountOutTransaction(): Observable<any[]> {
    const id = localStorage.getItem('userid');
    const token = localStorage.getItem('access_token');


    if (!id || !token) {
      return throwError(() => new Error('User ID or token is missing'));
    }

    return this.http.get<any[]>(`${this.apiUrl}/transactions/user/get-list-amount-out?userId=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  getListTop4Transaction(): Observable<any[]> {
    const id = localStorage.getItem('userid');
    const token = localStorage.getItem('access_token');

    if (!id || !token) {
      return throwError(() => new Error('User ID or token is missing'));
    }

    return this.http.get<any[]>(`${this.apiUrl}/transactions/user/get-top4-transaction-by-user?userId=${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }
}