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



@NgModule({
  declarations: [
    CategoryCreateComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule,
    OrganismsModule,
    FormsModule,
    ReactiveFormsModule
  ],
   exports: [
    CategoryCreateComponent,
    DashboardComponent
   ]
})
export class PagesModule { }
