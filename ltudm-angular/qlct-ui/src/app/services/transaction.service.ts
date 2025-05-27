import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/transactions/create';
  private apiUrl1 = "http://localhost:8080/api/categories/allcategories";
  private apiUrl2 = "http://localhost:8080/api/moneysource/allmoneysource";
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
  addTransaction(transactionData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Include if your API requires credentials
    };
    return this.http.post(this.apiUrl, transactionData, httpOptions)
  }
  getAllCategory(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Include if your API requires credentials
    };
    return this.http.get(this.apiUrl1, httpOptions)
  }

  getAllMoneySource(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Include if your API requires credentials
    };
    return this.http.get(this.apiUrl2, httpOptions)
  }

}