import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = "http://localhost:8080/api/budgets/create";
  constructor(private http: HttpClient) { }
}
