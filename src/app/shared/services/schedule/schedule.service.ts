import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../../models/schedule';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl: string = 'http://localhost:8082/api/v1/schedule';

  constructor(private http: HttpClient) { }

  postData(data: Schedule): Observable<Schedule>{
      return this.http.post<Schedule>(this.apiUrl, data);
    }
}
