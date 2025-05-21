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

  login(data: Login): Observable<Login> {
    return this.http.post<Login>(this.apiUrl, data, {
      withCredentials: true
    });
  }
}
