import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconComponent } from './icon/icon.component';
import { TextComponent } from './text/text.component';
import { LabelComponent } from './label/label.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    IconComponent,
    TextComponent,
    LabelComponent,
    InputComponent,
    LabelComponent,
    TextareaComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    IconComponent,
    TextComponent,
    InputComponent,
    LabelComponent,
    TextareaComponent,
    ButtonComponent
  ]
})
export class AtomsModule { }
