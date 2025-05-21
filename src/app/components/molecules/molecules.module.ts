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
import { PaginationComponent } from './pagination/pagination.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderSelectComponent } from './order-select/order-select.component';
import { CounterComponent } from './counter/counter.component';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    FormFieldComponent,
    TableComponent,
    PaginationComponent,
    SearchbarComponent,
    OrderSelectComponent,
    CounterComponent,
    NavbarHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    AppRoutingModule,
    AtomsModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    FormFieldComponent,
    TableComponent,
    PaginationComponent,
    SearchbarComponent,
    OrderSelectComponent,
    CounterComponent,
    NavbarHomeComponent
  ]
})
export class MoleculesModule { }
