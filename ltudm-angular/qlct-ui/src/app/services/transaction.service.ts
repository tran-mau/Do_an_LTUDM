import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrlCreate = 'http://localhost:8080/api/transactions/create';
  private apiUrl1 = "http://localhost:8080/api/categories/allcategories";
  private apiUrl2 = "http://localhost:8080/api/moneysource/allmoneysource";
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

    return this.http.get<any[]>(`${this.apiUrl}/transactions`, httpOptions)
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

    return this.http.delete<any[]>(`${this.apiUrl}/transactions/remove?id=${transactionId}`, httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updateTransaction(transactionId: number, transactionData: any): Observable<any> {
    const token = localStorage.getItem('access_token');

    console.log('=== ANGULAR UPDATE REQUEST ===');
    console.log('Transaction ID:', transactionId);
    console.log('Transaction Data:', transactionData);
    console.log('Token:', token ? 'Present' : 'Missing');

    if (!token) {
      return throwError(() => new Error('Access token is missing'));
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true
    };

    const url = `${this.apiUrl}/transactions/update?id=${transactionId}`;
    console.log('Request URL:', url);

    return this.http.put<any>(url, transactionData, httpOptions)
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
  addTransaction(transactionData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Include if your API requires credentials
    };
    return this.http.post(this.apiUrlCreate, transactionData, httpOptions)
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
  getBudgetAmount(userId: string, categoryName: string, date: string) {
  return this.http.get<number>(`http://localhost:8080/api/budget/getamountbudget`, {
    params: { userId, categoryName, date }
  });
}



  getTotalChi(request: any) {
    return this.http.post<any>(`http://localhost:8080/api/transactions/totalChi`, request);
  }


}