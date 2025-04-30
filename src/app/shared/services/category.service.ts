import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8081/api/v1/category';

  constructor(private http: HttpClient) { }

  postData(data: Category): Observable<Category>{
    return this.http.post<Category>(this.apiUrl, data);
  }
}
