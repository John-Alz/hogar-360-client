import { TestBed } from '@angular/core/testing';

import { PropertyService } from './property.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Property } from '../../models/property';
import { Page } from '../../models/page';

describe('PropertyService', () => {
  let service: PropertyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PropertyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should post Property data', () => {
    const dummyProperty: Property = {
      name: 'test property',
      description: 'test description',
      direction: 'Test direction',
      categoryId: 1,
      roomCount: 2,
      bathroomCount: 2,
      price: 150000000,
      locationId: 2,
      activePublicationDate: new Date('2025-05-20'),
      userId: 13
    };

    service.postProperty(dummyProperty).subscribe(response => {
      expect(response).toEqual(dummyProperty);
    })

    const req = httpMock.expectOne('http://localhost:8081/api/v1/property');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyProperty);

    req.flush(dummyProperty)

  });

   it('should send GET request with correct query parameters', () => {
    const mockResponse: Page<Property> = {
      content: [],
      totalElements: 0,
      totalPages: 0,
      pageSize: 10,
      pageNumber: 0,
    };

    service.getProperties(0, 10, true, 'Medellín', 'casa', 2, 1, 100000, 500000)
      .subscribe(res => {
        expect(res).toEqual(mockResponse);
      });

    const req = httpMock.expectOne((request) =>
      request.method === 'GET' &&
      request.url === 'http://localhost:8081/api/v1/property' &&
      request.params.get('pageNumber') === '0' &&
      request.params.get('pageSize') === '10' &&
      request.params.get('ascendingOrder') === 'true' &&
      request.params.get('locationFilter') === 'Medellín' &&
      request.params.get('categoryFilter') === 'casa' &&
      request.params.get('minRooms') === '2' &&
      request.params.get('minBathrooms') === '1' &&
      request.params.get('minPrice') === '100000' &&
      request.params.get('maxPrice') === '500000'
    );

    req.flush(mockResponse);
  });

    it('should omit optional params when they are null', () => {
    service.getProperties(1, 5, false, '', null, null, null, null, null, 13)
      .subscribe();

    const req = httpMock.expectOne((request) =>
      request.method === 'GET' &&
      request.params.get('categoryFilter') === null &&
      request.params.get('minRooms') === null &&
      request.params.get('minBathrooms') === null &&
      request.params.get('minPrice') === null &&
      request.params.get('maxPrice') === null
    );

    req.flush({});
  });



});
