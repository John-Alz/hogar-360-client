import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../models/category';
import { Page } from '../models/page';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should post category data', () => {
    const dummyCategory: Category = {
      name: 'casas de lujo',
      description: 'casas de lujo con tecnologia de ultima generacion.'
    };

    service.postData(dummyCategory).subscribe(response => {
      expect(response).toEqual(dummyCategory);
    })

    const req = httpMock.expectOne('http://localhost:8081/api/v1/category');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyCategory);

    req.flush(dummyCategory)

  });

  it('should call getData and return categories page', () => {
      const mockResponse: Page<Category> = {
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
        request.url === 'http://localhost:8081/api/v1/category' &&
        request.params.get('page') === '0' &&
        request.params.get('size') === '10'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

});
