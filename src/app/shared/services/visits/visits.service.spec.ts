import { TestBed } from '@angular/core/testing';

import { VisitsService } from './visits.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Visit } from '../../models/visit';

describe('VisitsService', () => {
  let service: VisitsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(VisitsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post category data', () => {
    const dummyVisit: Visit = {
      scheduleId: 123
    };

    service.postData(dummyVisit).subscribe(response => {
      expect(response).toEqual(dummyVisit);
    })

    const req = httpMock.expectOne('http://localhost:8082/api/v1/visit');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyVisit);

    req.flush(dummyVisit)

  });

});
