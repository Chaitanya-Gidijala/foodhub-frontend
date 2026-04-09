import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-customer-sidebar',
  templateUrl: './customer-sidebar.component.html',
  styleUrls: ['./customer-sidebar.component.css']
})
export class CustomerSidebarComponent implements OnInit {
  isSidebarOpen = false;
  cartCount = 0;
  favoritesCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe((count: number) => this.cartCount = count);
    this.favoritesService.favoritesCount$.subscribe((count: number) => this.favoritesCount = count);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
  }
}
