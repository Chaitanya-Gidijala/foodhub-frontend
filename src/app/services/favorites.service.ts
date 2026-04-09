import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { MenuItem } from '../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favRestaurantsSubject = new BehaviorSubject<Restaurant[]>(this.getFavRestaurantsFromStorage());
  private favDishesSubject = new BehaviorSubject<MenuItem[]>(this.getFavDishesFromStorage());

  favRestaurants$ = this.favRestaurantsSubject.asObservable();
  favDishes$ = this.favDishesSubject.asObservable();

  favoritesCount$ = new BehaviorSubject<number>(0);

  constructor() {
    // Combine counts for total favorites
    this.favRestaurants$.subscribe(res => this.updateTotalCount());
    this.favDishes$.subscribe(dishes => this.updateTotalCount());
  }

  private updateTotalCount(): void {
    const total = this.favRestaurantsSubject.value.length + this.favDishesSubject.value.length;
    this.favoritesCount$.next(total);
  }

  // --- RESTAURANTS ---
  private getFavRestaurantsFromStorage(): Restaurant[] {
    const data = localStorage.getItem('foodhub_fav_restaurants');
    return data ? JSON.parse(data) : [];
  }

  isFavoriteRestaurant(restaurantId: number): boolean {
    const favs = this.getFavRestaurantsFromStorage();
    return favs.some(r => r.id === restaurantId);
  }

  toggleFavoriteRestaurant(restaurant: Restaurant): void {
    let favs = this.getFavRestaurantsFromStorage();
    if (this.isFavoriteRestaurant(restaurant.id!)) {
      favs = favs.filter(r => r.id !== restaurant.id);
    } else {
      favs.push(restaurant);
    }
    localStorage.setItem('foodhub_fav_restaurants', JSON.stringify(favs));
    this.favRestaurantsSubject.next(favs);
  }

  // --- DISHES ---
  private getFavDishesFromStorage(): MenuItem[] {
    const data = localStorage.getItem('foodhub_fav_dishes');
    return data ? JSON.parse(data) : [];
  }

  isFavoriteDish(dishId: number): boolean {
    const favs = this.getFavDishesFromStorage();
    return favs.some(d => d.id === dishId);
  }

  toggleFavoriteDish(dish: MenuItem): void {
    let favs = this.getFavDishesFromStorage();
    if (this.isFavoriteDish(dish.id!)) {
      favs = favs.filter(d => d.id !== dish.id);
    } else {
      favs.push(dish);
    }
    localStorage.setItem('foodhub_fav_dishes', JSON.stringify(favs));
    this.favDishesSubject.next(favs);
  }
}
