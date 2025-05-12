import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Department } from '../../models/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

   private apiUrl: string = 'http://localhost:8081/api/v1/department';

    constructor(private http: HttpClient) { }


    getData(page: number, size: number): Observable<Page<Department>> {
      const params = {
        page: page.toString(),
        size: size.toString()
      }
      return this.http.get<Page<Department>>(this.apiUrl, { params });
    }

}
