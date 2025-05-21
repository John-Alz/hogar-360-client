import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Login } from '../../models/login';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockTokenPayload = {
    id: 1,
    sub: 'test@example.com',
    role: 'ADMIN'
  };

  // Simula un token JWT válido
  const base64Payload = btoa(JSON.stringify(mockTokenPayload));
  const mockJwt = `header.${base64Payload}.signature`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login and return a token', () => {
    const loginData: Login = { email: 'test@example.com', password: '123456' };
    const mockResponse = { token: 'mockToken123' };

    service.login(loginData).subscribe(res => {
      expect(res.token).toBe('mockToken123');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/v1/auth');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should return token from localStorage', () => {
    localStorage.setItem('token', 'mockToken123');
    expect(service.getToken()).toBe('mockToken123');
  });

  // it('should return null if no token in localStorage', () => {
  //   localStorage.setItem('', '');
  //   expect(service.getToken()).toBeNull();
  // });

  it('should return true if user is logged in', () => {
    localStorage.setItem('token', 'mockToken123');
    expect(service.isLoggedIn()).toBe(true);
  });

  // it('should return false if user is not logged in', () => {
  //   expect(service.isLoggedIn()).toBe(false);
  // });

  it('should decode user info from token', () => {
    localStorage.setItem('token', mockJwt);
    const userInfo = service.getUserInfo();

    expect(userInfo).toEqual({
      id: 1,
      email: 'test@example.com',
      role: 'ADMIN'
    });
  });

  it('should return null if token is malformed', () => {
    localStorage.setItem('token', 'invalid.token');
    expect(service.getUserInfo()).toBeNull();
  });

  it('should remove token on logOut()', () => {
    localStorage.setItem('token', 'mockToken');
    service.logOut();
    expect(localStorage.getItem('token')).toBeNull();
  });

});
