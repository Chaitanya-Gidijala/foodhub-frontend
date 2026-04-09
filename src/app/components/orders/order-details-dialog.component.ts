import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../models/order.model';
import { AddressService } from '../../services/address.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-details-dialog',
  template: `
    <h2 mat-dialog-title>
      <mat-icon>receipt</mat-icon>
      Order #{{data.orderId}} Details
    </h2>
    <mat-dialog-content>
      <div class="dialog-info">
        <p><strong>Restaurant:</strong> {{data.restaurantName}}</p>
        <p><strong>Status:</strong> <mat-chip color="primary">{{data.status}}</mat-chip></p>
      </div>
      
      <div class="delivery-address" *ngIf="deliveryAddress">
        <h3>
          <mat-icon>location_on</mat-icon>
          Delivery Address
        </h3>
        <div class="address-details">
          <p class="contact">{{deliveryAddress.fullName}} | {{deliveryAddress.phoneNumber}}</p>
          <p class="address">{{deliveryAddress.addressLine1}}</p>
          <p class="address" *ngIf="deliveryAddress.addressLine2">{{deliveryAddress.addressLine2}}</p>
          <p class="address">{{deliveryAddress.city}}, {{deliveryAddress.state}} - {{deliveryAddress.pincode}}</p>
          <p class="landmark" *ngIf="deliveryAddress.landmark">Near: {{deliveryAddress.landmark}}</p>
        </div>
      </div>
      
      <div class="no-address" *ngIf="!deliveryAddress && !data.addressId">
        <p><em>Delivery address not available for this order</em></p>
      </div>
      
      <h3>Items</h3>
      <table class="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of data.cartItems">
            <td>{{item.name}}</td>
            <td>{{item.quantity}}</td>
            <td>₹{{item.price}}</td>
            <td>₹{{item.price * item.quantity}}</td>
          </tr>
        </tbody>
      </table>
      
      <div class="total">
        <h3>Total Price: ₹{{data.totalPrice}}</h3>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-info { margin: 20px 0; }
    .delivery-address { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; }
    .delivery-address h3 { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; color: #3f51b5; }
    .address-details .contact { font-weight: 500; margin-bottom: 5px; }
    .address-details .address { margin: 3px 0; color: #666; }
    .address-details .landmark { font-style: italic; color: #888; margin-top: 5px; }
    .items-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .items-table th, .items-table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    .items-table th { background: #f5f5f5; font-weight: bold; }
    .total { text-align: right; padding: 20px; background: #e3f2fd; border-radius: 8px; margin-top: 20px; }
    .total h3 { margin: 0; color: #3f51b5; }
    h2 { display: flex; align-items: center; gap: 10px; }
  `]
})
export class OrderDetailsDialogComponent implements OnInit {
  deliveryAddress: any = null;

  constructor(
    public dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private addressService: AddressService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('Full Order object:', JSON.stringify(this.data, null, 2)); // Detailed debug
    if (this.data.addressId) {
      console.log('Loading address for ID:', this.data.addressId);
      this.loadDeliveryAddress();
    } else {
      console.log('No addressId found in order');
    }
  }

  loadDeliveryAddress(): void {
    const user = this.authService.getUserFromStorage();
    if (user) {
      this.addressService.getUserAddresses(user.id!).subscribe({
        next: (addresses) => {
          console.log('All addresses:', addresses); // Debug log
          this.deliveryAddress = addresses.find(addr => addr.id === this.data.addressId);
          console.log('Found delivery address:', this.deliveryAddress); // Debug log
        },
        error: (err) => {
          console.error('Error loading addresses:', err);
        }
      });
    }
  }
}
