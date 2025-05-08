import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './components/pages/category-create/category-create.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LocationComponent } from './components/pages/location/location.component';

const routes: Routes = [
  {path: 'categories', component: CategoryCreateComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'ubicaciones', component: LocationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
