// Premium Menu Component - Updated
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavoritesService } from '../../services/favorites.service';
import { MenuItem } from '../../models/menu.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {
  menuItems: MenuItem[] = [];
  filteredMenuItems: MenuItem[] = [];
  restaurantName = '';
  cartItems: any[] = [];
  searchTerm = '';
  selectedCategory = '';
  categories: string[] = [];
  cartItemCount = 0;
  cartTotal = 0;
  costForTwo = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.restaurantName = this.route.snapshot.params['name'];
    this.loadMenuItems();
    this.loadCartItems();
  }

  loadCartItems(): void {
    const user = this.authService.getUserFromStorage();
    if (user && user.id) {
      this.cartService.getCartByUserId(user.id).subscribe((cartItems: any[]) => {
        this.cartItems = cartItems;
        this.cartItemCount = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
        this.cartTotal = cartItems.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
      });
    }
  }

  getItemQuantity(item: MenuItem): number {
    const cartItem = this.cartItems.find(ci => ci.menuItemId === item.id);
    return cartItem ? cartItem.quantity : 0;
  }

  increaseQuantity(item: MenuItem): void {
    const existingCartItem = this.cartItems.find(ci => ci.menuItemId === item.id);
    if (existingCartItem) {
      this.cartService.updateQuantity(existingCartItem.cartItemId!, existingCartItem.quantity + 1).subscribe({
        next: () => {
          this.loadCartItems();
        },
        error: (err) => {
          this.snackBar.open('Error updating cart', 'Close', { duration: 2000 });
        }
      });
    } else {
      this.addToCart(item);
    }
  }

  decreaseQuantity(item: MenuItem): void {
    const cartItem = this.cartItems.find(ci => ci.menuItemId === item.id);
    if (cartItem) {
      if (cartItem.quantity === 1) {
        const user = this.authService.getUserFromStorage();
        if (user && user.id) {
          this.cartService.removeCartItem(cartItem.cartItemId!, user.id).subscribe({
            next: () => {
              this.loadCartItems();
              this.snackBar.open('Item removed from cart', 'Close', { duration: 2000 });
            },
            error: (err) => {
              console.error('Remove error:', err);
              this.snackBar.open('Error removing item', 'Close', { duration: 2000 });
            }
          });
        }
      } else {
        this.cartService.updateQuantity(cartItem.cartItemId!, cartItem.quantity - 1).subscribe({
          next: () => {
            this.loadCartItems();
          },
          error: (err) => {
            console.error('Update error:', err);
            this.snackBar.open('Error updating cart', 'Close', { duration: 2000 });
          }
        });
      }
    }
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  loadMenuItems(): void {
    this.menuService.getMenuItems(this.restaurantName).subscribe(data => {
      this.menuItems = data;
      this.filteredMenuItems = data;
      this.categories = [...new Set(data.map(item => item.categoryName).filter(Boolean))];
      this.calculateCostForTwo();
    });
  }

  calculateCostForTwo(): void {
    if (this.menuItems.length > 0) {
      const avgPrice = this.menuItems.reduce((sum, item) => sum + item.price, 0) / this.menuItems.length;
      this.costForTwo = Math.round(avgPrice * 2);
    }
  }

  filterItems(): void {
    let filtered = this.menuItems;
    if (this.searchTerm) {
      filtered = filtered.filter(item => 
        item.dishName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.selectedCategory) {
      filtered = filtered.filter(item => item.categoryName === this.selectedCategory);
    }
    this.filteredMenuItems = filtered;
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.filterItems();
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  viewCart(): void {
    this.router.navigate(['/cart']);
  }

  addToCart(item: MenuItem): void {
    const user = this.authService.getUserFromStorage();
    if (!user) {
      this.snackBar.open('Please login to add items to cart.', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }

    const cartItem = {
      userId: user.id!,
      menuItemId: item.id!,
      name: item.dishName,
      price: item.price,
      quantity: 1,
      restaurantId: item.restaurantId
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: () => {
        this.loadCartItems();
        this.snackBar.open('Added to cart!', 'Close', { duration: 2000 });
      },
      error: (err) => {
        this.snackBar.open(err.error || 'Cannot add items from different restaurants', 'Close', { duration: 3000 });
      }
    });
  }

  toggleFavorite(event: Event, item: MenuItem): void {
    event.stopPropagation();
    this.favoritesService.toggleFavoriteDish(item);
  }

  isFavorite(itemId: number): boolean {
    return this.favoritesService.isFavoriteDish(itemId);
  }
}
