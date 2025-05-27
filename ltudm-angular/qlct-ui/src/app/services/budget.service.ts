import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = "http://localhost:8080/api/budgets";
  private apiUrl1 = "http://localhost:8080/api/categories/allcategories";
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
  addBudget(budgetData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Include if your API requires credentials
    };
    return this.http.post(`${this.apiUrl}/create`, budgetData, httpOptions)
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
  getAllBudget(userId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true // Include if your API requires credentials
    };
    return this.http.post(`${this.apiUrl}/getall`, { userId }, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateBudget(budgetId: number, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/update/${budgetId}`;
    return this.http.put(url, updatedData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }
  deleteBudget(budgetId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${budgetId}`);
  }

  getTotalChi(userId: String, categoryName: String, startDate: string, endDate: string): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  const requestBody = { userId, categoryName, startDate, endDate };
  return this.http.post("http://localhost:8080/api/transactions/totalChi", requestBody, httpOptions);
}

  
}
