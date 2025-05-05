import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconComponent } from './icon/icon.component';
import { LabelComponent } from './label/label.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableRowComponent } from './table-row/table-row.component';




@NgModule({
  declarations: [
    IconComponent,
    LabelComponent,
    InputComponent,
    LabelComponent,
    TextareaComponent,
    ButtonComponent,
    TableRowComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    IconComponent,
    InputComponent,
    LabelComponent,
    TextareaComponent,
    ButtonComponent,
    TableRowComponent
  ]
})
export class AtomsModule { }
