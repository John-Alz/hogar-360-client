import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Visit } from '../../models/visit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

private apiUrl: string = 'http://localhost:8082/api/v1/visit';

  constructor(private http: HttpClient) { }

  postData(data: Visit): Observable<Visit> {
    return this.http.post<Visit>(this.apiUrl, data);
  }
}
