import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8081/api/v1/category';

  constructor(private http: HttpClient) { }

  postData(data: Category): Observable<Category>{
    return this.http.post<Category>(this.apiUrl, data);
  }

  getData(page: number, size: number): Observable<Page<Category>> {
    const params = {
      page: page.toString(),
      size: size.toString()
    }
    return this.http.get<Page<Category>>(this.apiUrl, {params});
  }
}
