import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Page } from '../models/page';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl: string = environments.apiUrl;

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
