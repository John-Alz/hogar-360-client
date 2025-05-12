import { TestBed } from '@angular/core/testing';
import { CityService } from './city.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Page } from '../../models/page';
import { City } from '../../models/city';

describe('CityService', () => {
  let service: CityService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CityService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getData with correct params and return data', () => {
    const mockResponse: Page<City> = {
      content: [{ id: 1, name: 'City 1', description: 'city 1 desc' }],
      pageNumber: 0,
      pageSize: 10,
      totalElements: 1,
      totalPages: 1
    };

    service.getData(0, 10, 123).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((request) =>
      request.url === 'http://localhost:8081/api/v1/city' &&
      request.params.get('page') === '0' &&
      request.params.get('size') === '10' &&
      request.params.get('departmentId') === '123'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
