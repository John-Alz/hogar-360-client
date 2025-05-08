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



@NgModule({
  declarations: [
    SidebarComponent,
    CategoryFormComponent,
    CategoryListComponent,
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AtomsModule,
    MoleculesModule
  ],
  exports: [
    SidebarComponent,
    CategoryFormComponent,
    CategoryListComponent,
    LocationFormComponent
  ]
})
export class OrganismsModule { }
