export interface MenuItem {
  id?: number;
  dishName: string;
  description: string;
  price: number;
  categoryName: string;
  restaurantId: number;
  available?: boolean;
  isNonVeg?: boolean;
}
