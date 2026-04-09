import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { API_ENDPOINTS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(API_ENDPOINTS.RESTAURANT.GET_ALL);
  }

  getRestaurantByName(name: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(API_ENDPOINTS.RESTAURANT.GET_BY_NAME(name));
  }

  getRestaurantByOwnerId(ownerId: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(API_ENDPOINTS.RESTAURANT.GET_BY_OWNER(ownerId));
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(API_ENDPOINTS.RESTAURANT.CREATE, restaurant);
  }

  updateRestaurant(name: string, restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(API_ENDPOINTS.RESTAURANT.UPDATE_BY_NAME(name), restaurant);
  }

  verifyRestaurant(id: number, status: string): Observable<Restaurant> {
    return this.http.put<Restaurant>(API_ENDPOINTS.RESTAURANT.VERIFY(id), {}, { params: { status } });
  }
}
