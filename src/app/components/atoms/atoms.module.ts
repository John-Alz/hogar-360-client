import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconComponent } from './icon/icon.component';
import { LabelComponent } from './label/label.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';
import { ErrorMessagePipe } from 'src/app/shared/pipes/error-message.pipe';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    IconComponent,
    LabelComponent,
    InputComponent,
    LabelComponent,
    TextareaComponent,
    ButtonComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    IconComponent,
    InputComponent,
    LabelComponent,
    TextareaComponent,
    ButtonComponent,
    SelectComponent
  ]
})
export class AtomsModule { }
