import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authToken: string | null = null;
  private refreshToken: string | null = null;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    return this.http.post(`${environment.apiUrl}auth/sign-in`, loginPayload).pipe(
      tap((response: any) => {
        if (response.data && response.success === false) {
          this.authToken = response.data.access_token || null;
          this.refreshToken = response.data.refresh_token || null;

          // Store tokens in localStorage for persistence
          localStorage.setItem('authToken', this.authToken || '');
          localStorage.setItem('refreshToken', this.refreshToken || '');
        }
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        throw error;
      })
    );
  }

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(): void {
    this.authToken = null;
    this.refreshToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
}


