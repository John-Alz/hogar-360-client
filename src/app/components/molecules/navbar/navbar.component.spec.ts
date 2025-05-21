import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToggleService } from 'src/app/shared/services/toggle/toggle.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const mockToggleService = {
    toggleState$: of(true),
  };

  const mockAuthService = {
    getUserInfo: jest.fn().mockReturnValue({ role: 'admin' }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [FontAwesomeModule],
      providers: [
        { provide: ToggleService, useValue: mockToggleService },
        { provide: AuthService, useValue: mockAuthService },
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose toggleState$ observable and emit true', (done) => {
    component.data$.subscribe((value) => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should get user role from authService', () => {
    expect(component.role).toBe('admin');
    expect(mockAuthService.getUserInfo).toHaveBeenCalled();
  });

  it('should have fontawesome icons defined', () => {
    expect(component.faBars).toBeDefined();
    expect(component.faXmark).toBeDefined();
  });

});
