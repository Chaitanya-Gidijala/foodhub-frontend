export interface CartItem {
  cartItemId?: number;
  userId: number;
  price: number;
  name: string;
  quantity: number;
  menuItemId: number;
  restaurantId: number;
  restaurantName?: string;
  isNonVeg?: boolean;
}
