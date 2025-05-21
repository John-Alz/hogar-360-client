import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.scss']
})
export class NavbarHomeComponent implements OnInit {

  public authService = inject(AuthService);

  isLogged = this.authService.isLoggedIn();
  role = this.authService.getUserInfo()?.role;
  accessLink!: string;

  flag: boolean = false;


  setFlag(): void {
    this.flag = !this.flag;
  }

  logOut(): void {
    this.authService.logOut();
  }

  ngOnInit(): void {
    if (this.role === "ADMIN") {
      this.accessLink = '/admin/dashboard'
    } else if (this.role === "VENDEDOR") {
      this.accessLink = '/seller/propiedades'
    }
  }

}
