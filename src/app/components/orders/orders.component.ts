// Premium Orders Component - Updated
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order.model';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from './order-details-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromStorage();
    if (user) {
      this.orderService.getOrdersByUserId(user.id!).subscribe(data => {
        this.orders = data;
      });
    }
  }

  viewDetails(order: Order): void {
    this.dialog.open(OrderDetailsDialogComponent, {
      width: '700px',
      data: order
    });
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'CONFIRMED': 'primary',
      'PREPARING': 'accent',
      'OUT_FOR_DELIVERY': 'primary',
      'DELIVERED': 'primary',
      'CANCELLED': 'warn'
    };
    return colors[status] || 'primary';
  }
}
