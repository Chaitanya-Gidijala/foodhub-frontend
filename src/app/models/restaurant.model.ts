export interface Restaurant {
  id?: number;
  restaurantName: string;
  location: string;
  phone: string;
  email: string;
  ownerId?: number;
  verificationStatus?: string;
}
