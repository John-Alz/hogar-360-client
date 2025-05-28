import { TestBed } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Schedule } from '../../models/schedule';

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
});
