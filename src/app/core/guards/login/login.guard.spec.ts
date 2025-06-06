import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { loginGuard } from './login.guard';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('loginGuard (con Jest)', () => {
  let authServiceMock: jest.Mocked<AuthService>;
  let routerMock: jest.Mocked<Router>;

  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  beforeEach(() => {
    authServiceMock = {
      isLoggedIn: jest.fn(),
      login: jest.fn(),
      getToken: jest.fn(),
      getUserInfo: jest.fn(),
      logOut: jest.fn()
    } as unknown as jest.Mocked<AuthService>;


    routerMock = {
  navigate: jest.fn()
} as unknown as jest.Mocked<Router>;


    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });
  });

  it('permite el acceso si el usuario NO está logueado', () => {
    authServiceMock.isLoggedIn.mockReturnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      loginGuard(mockRoute, mockState)
    );

    expect(result).toBe(true);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('bloquea el acceso y redirige si el usuario está logueado', () => {
    authServiceMock.isLoggedIn.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      loginGuard(mockRoute, mockState)
    );

    expect(result).toBe(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
