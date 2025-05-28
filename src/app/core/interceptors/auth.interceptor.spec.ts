import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let routerMock: jest.Mocked<Router>;

  const mockHandler: HttpHandler = {
    handle: jest.fn()
  };

  beforeEach(() => {

    routerMock = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;


    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: Router, useValue: routerMock }
      ]
    });
    interceptor = TestBed.inject(AuthInterceptor);
    localStorage.setItem('token', 'expiredToken');
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header if token exists', (done) => {
    localStorage.setItem('token', 'myTestToken');

    const request = new HttpRequest('GET', '/test');
    (mockHandler.handle as jest.Mock).mockImplementation((req) => {
      expect(req.headers.get('Authorization')).toBe('Bearer myTestToken');
      return of(null);
    });

    interceptor.intercept(request, mockHandler).subscribe(() => {
      done();
    });
  });

  it('should NOT add Authorization header if no token exists', (done) => {
    localStorage.removeItem('token');
    const request = new HttpRequest('GET', '/test');
    (mockHandler.handle as jest.Mock).mockImplementation((req) => {
      expect(req.headers.has('Authorization')).toBe(false);
      return of(null);
    });

    interceptor.intercept(request, mockHandler).subscribe(() => {
      done();
    });
  });

  it('should remove token and redirect on 401 error', (done) => {
    const request = new HttpRequest('GET', '/protected');

    const mockHandler: HttpHandler = {
      handle: jest.fn(() =>
        throwError(() =>
          new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' })
        )
      )
    };

    interceptor.intercept(request, mockHandler).subscribe({
      error: (error) => {
        expect(localStorage.getItem('token')).toBeNull();
        expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
        expect(error.status).toBe(401);
        done();
      }
    });
  });

});
