import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconComponent } from './icon/icon.component';
import { TextComponent } from './text/text.component';
import { LabelComponent } from './label/label.component';
import { InputComponent } from './input/input.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ButtonComponent } from './button/button.component';




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
    FontAwesomeModule
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
