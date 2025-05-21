import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { of } from 'rxjs';
import { ToggleService } from 'src/app/shared/services/toggle/toggle.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { navData } from './nav-data';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  const mockToggleService = {
    toggleState$: of(false),
  };

  const mockAuthService = {
    getUserInfo: jest.fn().mockReturnValue({ role: 'ADMIN' }),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [SidebarComponent],
      providers: [
        { provide: ToggleService, useValue: mockToggleService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize icons', () => {
    expect(component.faTag).toBeDefined();
    expect(component.faHome).toBeDefined();
    expect(component.faUsers).toBeDefined();
    expect(component.faGear).toBeDefined();
    expect(component.faGauge).toBeDefined();
  });

  it('should load navData into data property', () => {
    expect(component.data).toEqual(navData)
  });

  it('should subscribe to toggleService.toggleState$', (done) => {
    component.collapse$.subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should get role from authService', () => {
    expect(component.role).toBe('ADMIN');
    expect(mockAuthService.getUserInfo).toHaveBeenCalled();
  });

});
