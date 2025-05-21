import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarHomeComponent } from './navbar-home.component';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('NavbarHomeComponent', () => {
  let component: NavbarHomeComponent;
  let fixture: ComponentFixture<NavbarHomeComponent>;


   const mockAuthService = {
    isLoggedIn: jest.fn(),
    getUserInfo: jest.fn(),
    logOut: jest.fn()
  };

  beforeEach(async () => {

    mockAuthService.isLoggedIn.mockReturnValue(true);
    mockAuthService.getUserInfo.mockReturnValue({role: 'ADMIN'});

    await TestBed.configureTestingModule({
      declarations: [NavbarHomeComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ]
    });
    fixture = TestBed.createComponent(NavbarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isLogged to true from authService', () => {
    expect(component.isLogged).toBe(true);
    expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
  });

  it('should get the user role from authService', () => {
    expect(component.role).toBe('ADMIN');
    expect(mockAuthService.getUserInfo).toHaveBeenCalled();
  });

  it('should set accessLink based on role ADMIN in ngOnInit', () => {
    component.ngOnInit();
    expect(component.accessLink).toBe('/admin/dashboard');
  });

  it('should set accessLink based on role VENDEDOR in ngOnInit', () => {
    mockAuthService.getUserInfo.mockReturnValueOnce({ role: 'VENDEDOR' });
    const newFixture = TestBed.createComponent(NavbarHomeComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    newComponent.ngOnInit();
    expect(newComponent.accessLink).toBe('/seller/propiedades');
  });

  it('should toggle the flag value with setFlag()', () => {
    expect(component.flag).toBe(false);
    component.setFlag();
    expect(component.flag).toBe(true);
    component.setFlag();
    expect(component.flag).toBe(false);
  });

  it('should call logOut() method of authService', () => {
    component.logOut();
    expect(mockAuthService.logOut).toHaveBeenCalled();
  });

});
