import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) { }

  postUser(data: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, data);
  }
}
