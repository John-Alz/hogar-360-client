import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MoleculesModule } from '../molecules/molecules.module';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MoleculesModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class OrganismsModule { }
