import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { Restaurant } from '../../models/restaurant.model';
import { MenuItem } from '../../models/menu.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteRestaurants: Restaurant[] = [];
  favoriteDishes: MenuItem[] = [];
  user: any;

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserFromStorage();
    
    // Subscribe to favorite restaurants
    this.favoritesService.favRestaurants$.subscribe(restaurants => {
      this.favoriteRestaurants = restaurants;
    });

    // Subscribe to favorite dishes
    this.favoritesService.favDishes$.subscribe(dishes => {
      this.favoriteDishes = dishes;
    });
  }

  viewMenu(restaurantName: string): void {
    this.router.navigate(['/menu', restaurantName]);
  }

  toggleFavoriteRestaurant(event: Event, restaurant: Restaurant): void {
    event.stopPropagation();
    this.favoritesService.toggleFavoriteRestaurant(restaurant);
  }

  toggleFavoriteDish(event: Event, dish: MenuItem): void {
    event.stopPropagation();
    this.favoritesService.toggleFavoriteDish(dish);
  }

  isFavoriteRestaurant(id: number): boolean {
    return this.favoritesService.isFavoriteRestaurant(id);
  }

  isFavoriteDish(id: number): boolean {
    return this.favoritesService.isFavoriteDish(id);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
