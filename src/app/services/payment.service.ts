import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  createPaymentSession(bookingId: string, amount: number, addressId: number): Observable<string> {
    return this.http.post(API_ENDPOINTS.PAYMENT.CREATE_SESSION, { bookingId, amount, addressId }, { responseType: 'text' });
  }
}
