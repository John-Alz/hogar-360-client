import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Location } from '../../models/location';
import { Page } from '../../models/page';

describe('LocationService', () => {
  let service: LocationService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LocationService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getData and return location page', () => {
    const mockResponse: Page<Location> = {
      content: [{ id: 1, cityId: 1, barrio: 'test barrio' }],
      pageNumber: 0,
      pageSize: 10,
      totalElements: 1,
      totalPages: 1
    };

    service.getLocations(0, 10, 'test', true).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(request =>
      request.url === 'http://localhost:8081/api/v1/location' &&
      request.params.get('page') === '0' &&
      request.params.get('size') === '10' &&
      request.params.get('search') === 'test' &&
      request.params.get('orderAsc') === 'true'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should post loction data', () => {
      const dummyLocation: Location = {
        cityId: 1,
        barrio: 'Barrio de prueba'
      };

      service.postLocation(dummyLocation).subscribe(response => {
        expect(response).toEqual(dummyLocation);
      })

      const req = httpMock.expectOne('http://localhost:8081/api/v1/location');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(dummyLocation);

      req.flush(dummyLocation)

    });

});
