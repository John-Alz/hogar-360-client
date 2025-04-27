import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarLinkComponent } from './sidebar-link/sidebar-link.component';
import { IconComponent } from '../atoms/icon/icon.component';
import { AtomsModule } from '../atoms/atoms.module';
import { FormFieldComponent } from './form-field/form-field.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarLinkComponent,
    FormFieldComponent
  ],
  imports: [
    CommonModule,
    AtomsModule
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarLinkComponent,
    FormFieldComponent
  ]
})
export class MoleculesModule { }
