import { TestBed } from '@angular/core/testing';

import { PropertyService } from './property.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Property } from '../../models/property';

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
      activePublicationDate: new Date('2025-05-20')
    };

    service.postProperty(dummyProperty).subscribe(response => {
      expect(response).toEqual(dummyProperty);
    })

    const req = httpMock.expectOne('http://localhost:8081/api/v1/property');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyProperty);

    req.flush(dummyProperty)

  });
});
