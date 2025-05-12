import { TestBed } from '@angular/core/testing';
import { DepartmentService } from './department.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Page } from '../../models/page';
import { Department } from '../../models/department';

describe('DepartmentService', () => {
  let service: DepartmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentService]
    });
    service = TestBed.inject(DepartmentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getData and return departments page', () => {
    const mockResponse: Page<Department> = {
      content: [{ id: 1, name: 'test', description: 'test description' }],
      pageNumber: 0,
      pageSize: 10,
      totalElements: 1,
      totalPages: 1
    };

    service.getData(0, 10).subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(request =>
      request.url === 'http://localhost:8081/api/v1/department' &&
      request.params.get('page') === '0' &&
      request.params.get('size') === '10'
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
