import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../../models/schedule';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl: string = 'http://localhost:8082/api/v1/schedule';

  constructor(private http: HttpClient) { }

  postData(data: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.apiUrl, data);
  }

  getData(page: number, size: number, orderAsc: boolean, location: string, startDate: string, endDate: string, propertyId: string): Observable<Page<Schedule>> {
    const params = {
      page: page.toString(),
      size: size.toString(),
      orderAsc: orderAsc,
      location: location,
      startDate: startDate,
      endDate: endDate,
      propertyId: propertyId,
    }
    console.log(params);


    return this.http.get<Page<Schedule>>(this.apiUrl, { params });
  }
}
