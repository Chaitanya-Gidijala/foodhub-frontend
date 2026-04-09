import { CartItem } from './cart.model';

export interface Order {
  orderId?: number;
  userId: number;
  restaurantId: number;
  restaurantName?: string;
  totalPrice: number;
  status: string;
  addressId?: number;
  cartItems?: CartItem[];
  orderDate?: string;
}
