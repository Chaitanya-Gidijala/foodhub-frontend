import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getUserAddresses(userId: number): Observable<any[]> {
    return this.http.get<any[]>(API_ENDPOINTS.USERS.ADDRESSES_BY_USER(userId));
  }

  addAddress(userId: number, address: any): Observable<any> {
    return this.http.post<any>(API_ENDPOINTS.USERS.ADDRESSES_BY_USER(userId), address);
  }

  updateAddress(addressId: number, userId: number, address: any): Observable<any> {
    return this.http.put<any>(API_ENDPOINTS.ADDRESSES.UPDATE_FOR_USER(addressId, userId), address);
  }

  deleteAddress(addressId: number, userId: number): Observable<string> {
    return this.http.delete(API_ENDPOINTS.ADDRESSES.DELETE_FOR_USER(addressId, userId), { responseType: 'text' });
  }

  setDefaultAddress(addressId: number, userId: number): Observable<any> {
    return this.http.put<any>(API_ENDPOINTS.ADDRESSES.SET_DEFAULT_FOR_USER(addressId, userId), {});
  }
}