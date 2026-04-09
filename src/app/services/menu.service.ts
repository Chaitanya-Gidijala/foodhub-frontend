import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu.model';
import { API_ENDPOINTS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) {}

  getMenuItems(restaurantName: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(API_ENDPOINTS.MENU.GET_BY_RESTAURANT(restaurantName));
  }

  addMenuItem(menuItem: MenuItem): Observable<MenuItem> {
    return this.http.post<MenuItem>(API_ENDPOINTS.MENU.ADD, menuItem);
  }

  updateMenuItem(id: number, menuItem: MenuItem): Observable<MenuItem> {
    return this.http.put<MenuItem>(API_ENDPOINTS.MENU.UPDATE(id), menuItem);
  }

  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(API_ENDPOINTS.MENU.DELETE(id));
  }
}
