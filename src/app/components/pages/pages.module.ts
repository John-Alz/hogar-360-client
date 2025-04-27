import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { LabelComponent } from '../atoms/label/label.component';
import { InputComponent } from '../atoms/input/input.component';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';



@NgModule({
  declarations: [
    CategoryCreateComponent
  ],
  imports: [
    CommonModule,
    AtomsModule,
    MoleculesModule
  ],
   exports: [
    CategoryCreateComponent
   ]
})
export class PagesModule { }
