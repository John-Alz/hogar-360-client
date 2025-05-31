import { TestBed } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Schedule } from '../../models/schedule';
import { Page } from '../../models/page';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ScheduleService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post schedule data', () => {
    const dummySchedule: Schedule = {
      startDate: "2025-05-29T10:32",
      endDate: "2025-05-29T20:33",
    };

    service.postData(dummySchedule).subscribe(response => {
      expect(response).toEqual(dummySchedule);
    })

    const req = httpMock.expectOne('http://localhost:8082/api/v1/schedule');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummySchedule);

    req.flush(dummySchedule)

  });

  it('should call getData and return schedules page', () => {
    const mockResponse: Page<Schedule> = {
      content: [{ scheduleId: 1, propertyId: 123, startDate: "2025-06-19T10:45:00", endDate: "2025-06-19T12:46:00" }],
      pageNumber: 0,
      pageSize: 10,
      totalElements: 1,
      totalPages: 1
    };

    service.getData(0, 10, true, 'bogota', "2025-06-19T10:45:00", "2025-06-19T12:46:00").subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(request =>
      request.url === 'http://localhost:8082/api/v1/schedule' &&
      request.params.get('page') === '0' &&
      request.params.get('size') === '10' &&
      request.params.get('orderAsc') === 'true' &&
      request.params.get('location') === 'bogota' &&
      request.params.get('startDate') === '2025-06-19T10:45:00' &&
      request.params.get('endDate') === '2025-06-19T12:46:00'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
