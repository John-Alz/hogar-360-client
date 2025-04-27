import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8081/api/v1/category';

  constructor(private http: HttpClient) { }

  postData(data: any): Observable<any>{
    return this.http.post(this.apiUrl, data);
  }
}
