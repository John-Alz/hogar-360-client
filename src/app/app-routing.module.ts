import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryCreateComponent } from './components/pages/category-create/category-create.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { LocationComponent } from './components/pages/location/location.component';
import { UsersComponent } from './components/pages/users/users.component';
import { PropertiesComponent } from './components/pages/properties/properties.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'categories', component: CategoryCreateComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ubicaciones', component: LocationComponent },
      { path: 'usuarios', component: UsersComponent },
      { path: 'propiedades', component: PropertiesComponent },
      { path: 'login', component: LoginComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
