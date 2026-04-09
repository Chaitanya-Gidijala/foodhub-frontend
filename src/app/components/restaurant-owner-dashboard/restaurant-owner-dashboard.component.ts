import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuService } from '../../services/menu.service';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Restaurant } from '../../models/restaurant.model';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-restaurant-owner-dashboard',
  templateUrl: './restaurant-owner-dashboard.component.html',
  styleUrls: ['./restaurant-owner-dashboard.component.css']
})
export class RestaurantOwnerDashboardComponent implements OnInit, OnDestroy {
  activeTab: string = 'restaurant';
  private querySub: Subscription | undefined;
  restaurant: Restaurant | null = null;
  menuItems: MenuItem[] = [];
  orders: any[] = [];
  showCreateForm = false;
  showMenuForm = false;
  editingMenuItem: MenuItem | null = null;
  
  newRestaurant: Restaurant = {
    restaurantName: '',
    location: '',
    phone: '',
    email: ''
  };
  
  newMenuItem: MenuItem = {
    dishName: '',
    description: '',
    price: 0,
    categoryName: '',
    available: true,
    restaurantId: 0
  };

  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadRestaurant();
    
    this.querySub = this.route.queryParams.subscribe(params => {
      this.activeTab = params['tab'] || 'restaurant';
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  loadRestaurant(): void {
    const user = this.authService.getUserFromStorage();
    if (user && user.id) {
      this.restaurantService.getRestaurantByOwnerId(user.id).subscribe({
        next: (restaurant) => {
          this.restaurant = restaurant;
          this.loadMenuItems();
          this.loadOrders();
        },
        error: () => {
          this.showCreateForm = true;
        }
      });
    }
  }

  createRestaurant(): void {
    const user = this.authService.getUserFromStorage();
    this.newRestaurant.ownerId = user?.id;
    
    this.restaurantService.createRestaurant(this.newRestaurant).subscribe({
      next: (restaurant) => {
        this.restaurant = restaurant;
        this.showCreateForm = false;
        this.snackBar.open('Restaurant created! Awaiting admin approval.', 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open('Error creating restaurant', 'Close', { duration: 3000 });
      }
    });
  }

  loadMenuItems(): void {
    if (this.restaurant) {
      this.menuService.getMenuItems(this.restaurant.restaurantName).subscribe({
        next: (items) => this.menuItems = items,
        error: () => this.menuItems = []
      });
    }
  }

  addMenuItem(): void {
    this.newMenuItem.restaurantId = this.restaurant?.id || 0;
    this.menuService.addMenuItem(this.newMenuItem).subscribe({
      next: () => {
        this.snackBar.open('Menu item added', 'Close', { duration: 2000 });
        this.loadMenuItems();
        this.resetMenuForm();
      },
      error: () => this.snackBar.open('Error adding item', 'Close', { duration: 3000 })
    });
  }

  editMenuItem(item: MenuItem): void {
    this.editingMenuItem = { ...item };
    this.showMenuForm = true;
  }

  updateMenuItem(): void {
    if (this.editingMenuItem && this.editingMenuItem.id) {
      this.menuService.updateMenuItem(this.editingMenuItem.id, this.editingMenuItem).subscribe({
        next: () => {
          this.snackBar.open('Menu item updated', 'Close', { duration: 2000 });
          this.loadMenuItems();
          this.resetMenuForm();
        },
        error: () => this.snackBar.open('Error updating item', 'Close', { duration: 3000 })
      });
    }
  }

  deleteMenuItem(id: number): void {
    if (confirm('Delete this menu item?')) {
      this.menuService.deleteMenuItem(id).subscribe({
        next: () => {
          this.snackBar.open('Menu item deleted', 'Close', { duration: 2000 });
          this.loadMenuItems();
        },
        error: () => this.snackBar.open('Error deleting item', 'Close', { duration: 3000 })
      });
    }
  }

  loadOrders(): void {
    if (this.restaurant?.id) {
      this.orderService.getRestaurantOrders(this.restaurant.id).subscribe({
        next: (orders) => this.orders = orders,
        error: () => this.orders = []
      });
    }
  }

  updateOrderStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.snackBar.open('Order status updated', 'Close', { duration: 2000 });
        this.loadOrders();
      },
      error: () => this.snackBar.open('Error updating status', 'Close', { duration: 3000 })
    });
  }

  resetMenuForm(): void {
    this.newMenuItem = {
      dishName: '',
      description: '',
      price: 0,
      categoryName: '',
      available: true,
      restaurantId: 0
    };
    this.editingMenuItem = null;
    this.showMenuForm = false;
  }
}
