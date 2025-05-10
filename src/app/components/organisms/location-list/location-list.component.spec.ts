import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationListComponent } from './location-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocationService } from 'src/app/shared/services/location/location.service';

describe('LocationListComponent', () => {
  let component: LocationListComponent;
  let fixture: ComponentFixture<LocationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      declarations: [LocationListComponent],
      providers: [
        {provide: LocationService}
      ]
    });
    fixture = TestBed.createComponent(LocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
