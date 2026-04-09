import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  constructor(private router: Router) {}

  navigateToRestaurants(): void {
    this.router.navigate(['/restaurants']);
  }

  navigateToOrders(): void {
    this.router.navigate(['/orders']);
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
