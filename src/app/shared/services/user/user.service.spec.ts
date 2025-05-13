import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../models/user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
        httpMock = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post loction data', () => {
    const dummyLocation: User = {
      firstName: 'John',
      lastName: 'Angel',
      identityNumber: 22664344,
      phoneNumber: 12236234,
      birthDate: new Date('2000-07-25'),
      email: 'john@gmail.com',
      password: 'password',
      roleId: 13
    };

    service.postUser(dummyLocation).subscribe(response => {
      expect(response).toEqual(dummyLocation);
    })

    const req = httpMock.expectOne('http://localhost:8080/api/v1/user');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyLocation);

    req.flush(dummyLocation)

  });

});
