import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-restaurant-sidebar',
  templateUrl: './restaurant-sidebar.component.html',
  styleUrls: ['./restaurant-sidebar.component.css']
})
export class RestaurantSidebarComponent {
  isSidebarOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
  }
}
