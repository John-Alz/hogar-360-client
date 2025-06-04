import { TestBed } from '@angular/core/testing';
import { ToggleService } from './toggle.service';
import { BehaviorSubject } from 'rxjs';

describe('ToggleService', () => {
  let service: ToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial toggleState of true', (done) => {
    service.toggleState$.subscribe(state => {
      expect(state).toBe(true);
      done(); // Necesario para pruebas asíncronas
    });
  });

  it('should update the toggleState when setToggleState is called', (done) => {
    service.setToggleState(false);
    service.toggleState$.subscribe(state => {
      expect(state).toBe(false);
      done();
    });
  });

  it('should toggle the state when toggle is called', (done) => {
    service.toggle(); // Cambia el estado de true a false
    service.toggleState$.subscribe(state => {
      expect(state).toBe(false);
      done();
    });
  });

  it('should toggle the state again when toggle is called again', (done) => {
    service.toggle(); // Cambia el estado de true a false
    service.toggle(); // Cambia el estado de false a true
    service.toggleState$.subscribe(state => {
      expect(state).toBe(true);
      done();
    });
  });
});
