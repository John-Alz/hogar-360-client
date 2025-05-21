import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  login(data: Login): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserInfo(): { id: number; email: string; role: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        email: payload.sub,
        role: payload.authorities || payload.role
      };
    } catch (error) {
      return null;
    }

  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logOut(): void {
    localStorage.removeItem('token')
  }

}
