import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { API_ENDPOINTS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  placeOrder(userId: number): Observable<Order> {
    return this.http.post<Order>(API_ENDPOINTS.ORDER.PLACE(userId), {});
  }

  placeOrderWithAddress(userId: number, addressId: number): Observable<Order> {
    return this.http.post<Order>(API_ENDPOINTS.ORDER.PLACE(userId), { addressId });
  }

  getOrdersByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(API_ENDPOINTS.ORDER.GET_BY_USER(userId));
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(API_ENDPOINTS.ORDER.GET_BY_ID(orderId));
  }

  getRestaurantOrders(restaurantId: number): Observable<Order[]> {
    return this.http.get<Order[]>(API_ENDPOINTS.ORDER.GET_BY_RESTAURANT(restaurantId));
  }

  updateOrderStatus(orderId: number, status: string): Observable<Order> {
    return this.http.patch<Order>(API_ENDPOINTS.ORDER.UPDATE_STATUS(orderId), {}, { params: { status } });
  }

  rollbackOrder(orderId: number): Observable<string> {
    return this.http.post(API_ENDPOINTS.ORDER.ROLLBACK(orderId), {}, { responseType: 'text' });
  }
}
