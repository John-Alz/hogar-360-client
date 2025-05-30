import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { AtomsModule } from '../atoms/atoms.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './category-list/category-list.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationListComponent } from './location-list/location-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { PorpertyFormComponent } from './porperty-form/porperty-form.component';
import { PorpertyListComponent } from './porperty-list/porperty-list.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { ScheduleListComponent } from './schedule-list/schedule-list.component';
import { PropertyListHomeComponent } from './property-list-home/property-list-home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    SidebarComponent,
    CategoryFormComponent,
    CategoryListComponent,
    LocationFormComponent,
    LocationListComponent,
    UserFormComponent,
    PorpertyFormComponent,
    PorpertyListComponent,
    LoginFormComponent,
    ScheduleFormComponent,
    ScheduleListComponent,
    PropertyListHomeComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    RouterModule,
    AtomsModule,
    MoleculesModule,
],
  exports: [
    SidebarComponent,
    CategoryFormComponent,
    CategoryListComponent,
    LocationFormComponent,
    LocationListComponent,
    UserFormComponent,
    PorpertyFormComponent,
    PorpertyListComponent,
    LoginFormComponent,
    ScheduleFormComponent,
    ScheduleListComponent,
    PropertyListHomeComponent
  ]
})
export class OrganismsModule { }
