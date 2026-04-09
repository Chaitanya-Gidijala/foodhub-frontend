// Premium Cart Component - Updated
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CartItem } from '../../models/cart.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  userId!: number;
  restaurantName = '';
  itemTotal = 0;
  deliveryFee = 40;
  taxes = 0;
  grandTotal = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromStorage();
    if (user) {
      this.userId = user.id!;
      this.loadCart();
    }
  }

  loadCart(): void {
    this.cartService.getCartByUserId(this.userId).subscribe(data => {
      this.cartItems = data;
      if (data.length > 0) {
        this.restaurantName = data[0].restaurantName || 'Restaurant';
      }
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.itemTotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.taxes = Math.round(this.itemTotal * 0.05);
    this.grandTotal = this.itemTotal + this.deliveryFee + this.taxes;
    this.totalPrice = this.grandTotal;
  }

  increaseQuantity(item: CartItem): void {
    this.updateQuantity(item.cartItemId!, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity === 1) {
      this.removeItem(item.cartItemId!);
    } else {
      this.updateQuantity(item.cartItemId!, item.quantity - 1);
    }
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/address-selection']);
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(cartItemId);
      return;
    }
    this.cartService.updateQuantity(cartItemId, quantity).subscribe(() => {
      this.loadCart();
    });
  }

  removeItem(cartItemId: number): void {
    this.cartService.removeCartItem(cartItemId, this.userId).subscribe(() => {
      this.snackBar.open('Item removed', 'Close', { duration: 2000 });
      this.loadCart();
    });
  }

  proceedToAddressSelection(): void {
    if (this.cartItems.length === 0) {
      this.snackBar.open('Cart is empty', 'Close', { duration: 2000 });
      return;
    }
    this.router.navigate(['/address-selection']);
  }
}
