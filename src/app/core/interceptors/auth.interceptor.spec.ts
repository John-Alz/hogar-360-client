import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  const mockHandler: HttpHandler = {
    handle: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor]
    });
    interceptor = TestBed.inject(AuthInterceptor);
    localStorage.clear();
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
    const request = new HttpRequest('GET', '/test');
    (mockHandler.handle as jest.Mock).mockImplementation((req) => {
      expect(req.headers.has('Authorization')).toBe(false);
      return of(null);
    });

    interceptor.intercept(request, mockHandler).subscribe(() => {
      done();
    });
  });
});
