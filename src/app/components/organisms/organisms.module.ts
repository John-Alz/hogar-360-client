import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { AtomsModule } from '../atoms/atoms.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidebarComponent,
    CategoryFormComponent
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
    CategoryFormComponent
  ]
})
export class OrganismsModule { }
