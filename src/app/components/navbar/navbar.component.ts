import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User | null = null;
  cartCount = 0;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user$.subscribe(user => {
      console.log('Navbar received user update:', user);
      this.user = user;
      if (user) {
        // Only fetch cart count for customers
        if (user.role === 'CUSTOMER') {
          this.cartService.cartCount$.subscribe(count => {
            this.cartCount = count;
          });
          this.cartService.getCartByUserId(user.id!).subscribe({
            error: (err) => console.warn('Cart service unavailable, skipping count update')
          });
        }
      }
    });
    // Force refresh user data
    this.authService.refreshUser();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
