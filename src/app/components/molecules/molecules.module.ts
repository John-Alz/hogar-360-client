import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AtomsModule } from '../atoms/atoms.module';
import { FormFieldComponent } from './form-field/form-field.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableComponent } from './table/table.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    FormFieldComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AppRoutingModule,
    AtomsModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    FormFieldComponent,
    TableComponent
  ]
})
export class MoleculesModule { }
