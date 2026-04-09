// Premium Payment Component - Updated
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { AddressService } from '../../services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalAmount = 0;
  itemTotal = 0;
  deliveryFee = 40;
  taxes = 0;
  userId!: number;
  selectedAddress: any = null;
  addressId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private authService: AuthService,
    private addressService: AddressService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromStorage();
    if (user) {
      this.userId = user.id!;
      const params = this.route.snapshot.queryParams;
      this.addressId = Number(params['addressId']);

      // Check if we came back from a cancelled stripe session
      const cancelled = params['cancelled'] === 'true';
      const orderId = params['orderId'];

      if (cancelled && orderId) {
        this.orderService.rollbackOrder(Number(orderId)).subscribe({
          next: () => {
            this.snackBar.open('Payment Cancelled. Your cart has been restored.', 'OK', { 
              duration: 5000,
              panelClass: ['warning-snackbar']
            });
            this.loadCartTotal();
          }
        });
      }

      if (this.addressId) {
        this.loadSelectedAddress();
        this.loadCartTotal();
      } else {
        this.snackBar.open('No address selected', 'Close', { duration: 3000 });
      }
    }
  }

  loadSelectedAddress(): void {
    this.addressService.getUserAddresses(this.userId).subscribe(addresses => {
      this.selectedAddress = addresses.find(addr => addr.id === this.addressId);
    });
  }

  loadCartTotal(): void {
    this.cartService.getCartByUserId(this.userId).subscribe(items => {
      this.itemTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      this.taxes = Math.round(this.itemTotal * 0.05);
      this.totalAmount = this.itemTotal + this.deliveryFee + this.taxes;
    });
  }

  proceedToPayment(): void {
    if (!this.addressId) {
      this.snackBar.open('No address selected', 'Close', { duration: 3000 });
      return;
    }
    
    this.orderService.placeOrderWithAddress(this.userId, this.addressId).subscribe({
      next: (order) => {
        localStorage.setItem('pendingOrderId', order.orderId!.toString());
        this.paymentService.createPaymentSession(order.orderId!.toString(), this.totalAmount, this.addressId!).subscribe({
          next: (url) => {
            window.location.href = url;
          },
          error: () => {
            this.snackBar.open('Payment failed', 'Close', { duration: 3000 });
          }
        });
      },
      error: () => {
        this.snackBar.open('Order creation failed', 'Close', { duration: 3000 });
      }
    });
  }
}
