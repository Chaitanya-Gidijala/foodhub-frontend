import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { FavoritesService } from '../../services/favorites.service';
import { Restaurant } from '../../models/restaurant.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }

  viewMenu(restaurantName: string): void {
    this.router.navigate(['/menu', restaurantName]);
  }

  toggleFavorite(event: Event, restaurant: Restaurant): void {
    event.stopPropagation();
    this.favoritesService.toggleFavoriteRestaurant(restaurant);
  }

  isFavorite(restaurantId: number): boolean {
    return this.favoritesService.isFavoriteRestaurant(restaurantId);
  }
}
