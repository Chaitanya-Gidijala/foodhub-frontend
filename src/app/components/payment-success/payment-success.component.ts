// Premium Payment Success - Updated
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  order?: Order;
  userId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromStorage();
    if (user) {
      this.userId = user.id!;
    }

    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (orderId) {
      this.orderService.getOrderById(+orderId).subscribe(order => {
        this.order = order;
        // Formally confirm the order now that payment is successful
        this.orderService.updateOrderStatus(+orderId, 'CONFIRMED').subscribe();
        this.cartService.clearCart(this.userId).subscribe();
        localStorage.removeItem('pendingOrderId');
      });
    }
  }

  viewAllOrders(): void {
    this.router.navigate(['/orders']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
