import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RestaurantService } from '../../services/restaurant.service';
import { MenuService } from '../../services/menu.service';
import { FavoritesService } from '../../services/favorites.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];
  allMenuItems: any[] = [];
  searchTerm: string = '';
  restaurantCostMap: Map<string, number> = new Map();

  constructor(
    private authService: AuthService, 
    private router: Router,
    private restaurantService: RestaurantService,
    private menuService: MenuService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromStorage();
    if (user) {
      if (user.role === 'ADMIN') {
        this.router.navigate(['/admin-dashboard']);
        return;
      } else if (user.role === 'RESTAURANT_OWNER') {
        this.router.navigate(['/restaurant-owner-dashboard']);
        return;
      }
    }
    
    // Customers and Guests stay on home page
    this.loadRestaurantsAndMenus();
  }

  toggleFavorite(event: Event, restaurant: Restaurant): void {
    event.stopPropagation();
    this.favoritesService.toggleFavoriteRestaurant(restaurant);
  }

  isFavorite(restaurantId: number): boolean {
    return this.favoritesService.isFavoriteRestaurant(restaurantId);
  }

  loadRestaurantsAndMenus(): void {
    this.restaurantService.getAllRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants.filter(r => r.verificationStatus === 'APPROVED');
      this.filteredRestaurants = this.restaurants;
      
      // Load menu items for each restaurant and calculate cost for two
      this.restaurants.forEach(restaurant => {
        this.menuService.getMenuItems(restaurant.restaurantName).subscribe(menuItems => {
          menuItems.forEach(item => {
            this.allMenuItems.push({
              ...item,
              restaurantName: restaurant.restaurantName
            });
          });
          
          // Calculate cost for two
          if (menuItems.length > 0) {
            const avgPrice = menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length;
            this.restaurantCostMap.set(restaurant.restaurantName, Math.round(avgPrice * 2));
          }
        });
      });
    });
  }

  getCostForTwo(restaurantName: string): number {
    return this.restaurantCostMap.get(restaurantName) || 200;
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredRestaurants = this.restaurants;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    
    // Search in restaurants
    const restaurantMatches = this.restaurants.filter(restaurant => 
      restaurant.restaurantName.toLowerCase().includes(term) ||
      restaurant.location.toLowerCase().includes(term)
    );
    
    // Search in menu items
    const menuMatches = this.allMenuItems.filter(item =>
      item.dishName?.toLowerCase().includes(term) ||
      item.description?.toLowerCase().includes(term) ||
      item.categoryName?.toLowerCase().includes(term)
    );
    
    // Get restaurants that have matching menu items
    const restaurantsWithMatchingMenus = this.restaurants.filter(restaurant =>
      menuMatches.some(item => item.restaurantName === restaurant.restaurantName)
    );
    
    // Combine and remove duplicates
    const allMatches = [...restaurantMatches, ...restaurantsWithMatchingMenus];
    this.filteredRestaurants = allMatches.filter((restaurant, index, self) =>
      index === self.findIndex(r => r.restaurantName === restaurant.restaurantName)
    );
  }

  filterByCategory(category: string): void {
    this.searchTerm = category;
    this.onSearch();
  }

  viewMenu(restaurantName: string): void {
    this.router.navigate(['/menu', restaurantName]);
  }
}
