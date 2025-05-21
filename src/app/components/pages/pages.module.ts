import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { LabelComponent } from '../atoms/label/label.component';
import { InputComponent } from '../atoms/input/input.component';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganismsModule } from '../organisms/organisms.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationComponent } from './location/location.component';
import { UsersComponent } from './users/users.component';
import { PropertiesComponent } from './properties/properties.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    CategoryCreateComponent,
    DashboardComponent,
    LocationComponent,
    UsersComponent,
    PropertiesComponent,
    LoginComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    OrganismsModule,
    MoleculesModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
   exports: [
    CategoryCreateComponent,
    DashboardComponent
   ]
})
export class PagesModule { }
