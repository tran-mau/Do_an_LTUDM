import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/settings/userProfile`);
  }

  editUserProfile(data: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/api/settings/editProfile`, data, {
      observe: 'response'
    });
  }
}