import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('authGuard (Jest)', () => {
  let mockAuthService: Partial<AuthService>;
  let mockRouter: Partial<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    mockAuthService = {
      isLoggedIn: jest.fn(),
      getUserInfo: jest.fn()
    };

    mockRouter = {
      navigate: jest.fn()
    };

    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = { url: '/some-url' } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('should allow if NOT logged in', () => {
    (mockAuthService.isLoggedIn as jest.Mock).mockReturnValue(false);

    const result = TestBed.runInInjectionContext(() =>
      authGuard('ADMIN')(mockRoute, mockState)
    );

    expect(result).toBe(false);
  });

  it('should allow if logged in AND has expected role', () => {
    (mockAuthService.isLoggedIn as jest.Mock).mockReturnValue(true);
    (mockAuthService.getUserInfo as jest.Mock).mockReturnValue({ role: 'ADMIN' });

    const result = TestBed.runInInjectionContext(() =>
      authGuard('ADMIN')(mockRoute, mockState)
    );

    expect(result).toBe(true);
  });

  it('should block if logged in BUT wrong role', () => {
    (mockAuthService.isLoggedIn as jest.Mock).mockReturnValue(true);
    (mockAuthService.getUserInfo as jest.Mock).mockReturnValue({ role: 'VENDEDOR' });

    const result = TestBed.runInInjectionContext(() =>
      authGuard('ADMIN')(mockRoute, mockState)
    );

    expect(result).toBe(false);
  });

  it('should block if getUserInfo returns null', () => {
    (mockAuthService.isLoggedIn as jest.Mock).mockReturnValue(true);
    (mockAuthService.getUserInfo as jest.Mock).mockReturnValue(null);

    const result = TestBed.runInInjectionContext(() =>
      authGuard('ADMIN')(mockRoute, mockState)
    );

    expect(result).toBe(false);
  });
});
