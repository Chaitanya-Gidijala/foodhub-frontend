import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CartItem } from '../models/cart.model';
import { API_ENDPOINTS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartCount$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  addToCart(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(API_ENDPOINTS.CART.ADD, item).pipe(
      tap(() => this.updateCartCount(item.userId))
    );
  }

  getCartByUserId(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(API_ENDPOINTS.CART.GET_BY_USER(userId)).pipe(
      tap(items => this.cartCount$.next(items.length))
    );
  }

  updateQuantity(cartItemId: number, quantity: number): Observable<CartItem> {
    return this.http.patch<CartItem>(API_ENDPOINTS.CART.UPDATE(cartItemId) + `?quantity=${quantity}`, {});
  }

  removeCartItem(cartItemId: number, userId: number): Observable<string> {
    return this.http.delete(API_ENDPOINTS.CART.REMOVE(cartItemId), { responseType: 'text' }).pipe(
      tap(() => this.updateCartCount(userId))
    );
  }

  clearCart(userId: number): Observable<string> {
    return this.http.delete(`${API_ENDPOINTS.CART.CLEAR(userId)}`, { responseType: 'text' }).pipe(
      tap(() => this.cartCount$.next(0))
    );
  }

  private updateCartCount(userId: number): void {
    this.getCartByUserId(userId).subscribe();
  }
}
