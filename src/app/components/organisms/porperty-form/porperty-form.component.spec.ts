import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorpertyFormComponent } from './porperty-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PropertyService } from 'src/app/shared/services/property/property.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { of } from 'rxjs';

describe('PorpertyFormComponent', () => {
  let component: PorpertyFormComponent;
  let fixture: ComponentFixture<PorpertyFormComponent>;
  let mockPropertyService: any;
  let mockNotificationService: any;

  beforeEach(async () => {

    mockPropertyService = {
      postProperty: jest.fn().mockReturnValue(of({}))
    };

    mockNotificationService = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({

      imports: [HttpClientTestingModule],
      declarations: [PorpertyFormComponent],
      providers: [
        { provide: PropertyService, useValue: mockPropertyService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    });
    fixture = TestBed.createComponent(PorpertyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar al servicio si el formulario es válido', () => {
    component.propertyForm.controls['name'].setValue('test property');
    component.propertyForm.controls['description'].setValue('test description');
    component.propertyForm.controls['direction'].setValue('Test direction');
    component.propertyForm.controls['categoryId'].setValue(1);
    component.propertyForm.controls['roomCount'].setValue(2);
    component.propertyForm.controls['bathroomCount'].setValue(2);
    component.propertyForm.controls['price'].setValue(150000000);
    component.propertyForm.controls['locationId'].setValue(2);
    component.propertyForm.controls['activePublicationDate'].setValue(new Date('2025-05-20'));

    component.sendData();

    expect(mockPropertyService.postProperty).toHaveBeenCalledWith({
      name: 'test property',
      description: 'test description',
      direction: 'Test direction',
      categoryId: 1,
      roomCount: 2,
      bathroomCount: 2,
      price: 150000000,
      locationId: 2,
      activePublicationDate: new Date('2025-05-20')
    });
    expect(mockNotificationService.success).toHaveBeenCalledWith('Propiedad creada.');
  });

  it('debería llamar al servicio si el formulario es válido', () => {
    component.propertyForm.controls['name'].setValue('');
    component.propertyForm.controls['description'].setValue('');
    component.propertyForm.controls['direction'].setValue('');
    component.propertyForm.controls['categoryId'].setValue('');
    component.propertyForm.controls['roomCount'].setValue('');
    component.propertyForm.controls['bathroomCount'].setValue('');
    component.propertyForm.controls['price'].setValue('');
    component.propertyForm.controls['locationId'].setValue('');
    component.propertyForm.controls['activePublicationDate'].setValue('');

    component.sendData();

    expect(mockPropertyService.postProperty).not.toHaveBeenCalled();
    expect(mockNotificationService.success).not.toHaveBeenCalled();
  });

});
