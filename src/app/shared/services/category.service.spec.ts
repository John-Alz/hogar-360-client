import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../models/category';

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

});
