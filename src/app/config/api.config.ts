import { environment } from '../../environments/environment';

function joinUrl(base: string, path: string): string {
  if (!base) return path;
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

const API_BASE = environment.apiGateway;

/**
 * Central registry for ALL backend endpoints.
 * Never hardcode URLs/endpoints in services/components — import from here.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: joinUrl(API_BASE, '/api/auth/login'),
    REGISTER: joinUrl(API_BASE, '/api/auth/register'),
    PROFILE: joinUrl(API_BASE, '/api/auth/profile'),
  },

  USERS: {
    GET_ALL: joinUrl(API_BASE, '/api/users/all'),
    GET_BY_ID: (userId: number) => joinUrl(API_BASE, `/api/users/${userId}`),
    UPDATE: (userId: number) => joinUrl(API_BASE, `/api/users/${userId}`),
    DELETE: (userId: number) => joinUrl(API_BASE, `/api/users/${userId}`),
    APPROVAL: (userId: number) => joinUrl(API_BASE, `/api/users/${userId}/approve`),
    ADDRESSES_BY_USER: (userId: number) => joinUrl(API_BASE, `/api/users/${userId}/addresses`),
  },

  ADDRESSES: {
    UPDATE_FOR_USER: (addressId: number, userId: number) =>
      joinUrl(API_BASE, `/api/addresses/${addressId}/users/${userId}`),
    DELETE_FOR_USER: (addressId: number, userId: number) =>
      joinUrl(API_BASE, `/api/addresses/${addressId}/users/${userId}`),
    SET_DEFAULT_FOR_USER: (addressId: number, userId: number) =>
      joinUrl(API_BASE, `/api/addresses/${addressId}/users/${userId}/default`),
  },

  RESTAURANT: {
    GET_ALL: joinUrl(API_BASE, '/api/restaurants'),
    GET_BY_NAME: (name: string) => joinUrl(API_BASE, `/api/restaurants/${name}`),
    CREATE: joinUrl(API_BASE, '/api/restaurants'),
    GET_BY_OWNER: (ownerId: number) => joinUrl(API_BASE, `/api/restaurants/owner/${ownerId}`),
    UPDATE_BY_NAME: (name: string) => joinUrl(API_BASE, `/api/restaurants/${name}`),
    DELETE: (name: string) => joinUrl(API_BASE, `/api/restaurants/${name}`),
    VERIFY: (id: number) => joinUrl(API_BASE, `/api/restaurants/${id}/verify`),
  },

  MENU: {
    GET_BY_RESTAURANT: (name: string) => joinUrl(API_BASE, `/api/restaurants/${name}/menu-items`),
    ADD: joinUrl(API_BASE, '/api/menu-items'),
    UPDATE: (id: number) => joinUrl(API_BASE, `/api/menu-items/${id}`),
    DELETE: (id: number) => joinUrl(API_BASE, `/api/menu-items/${id}`),
  },

  CART: {
    ADD: joinUrl(API_BASE, '/cart/add'),
    GET_BY_USER: (userId: number) => joinUrl(API_BASE, `/cart/user/${userId}`),
    UPDATE: (cartItemId: number) => joinUrl(API_BASE, `/cart/update/${cartItemId}`),
    REMOVE: (cartItemId: number) => joinUrl(API_BASE, `/cart/remove/${cartItemId}`),
    CLEAR: (userId: number) => joinUrl(API_BASE, `/cart/clear/${userId}`),
  },

  ORDER: {
    PLACE: (userId: number) => joinUrl(API_BASE, `/orders/place/${userId}`),
    GET_BY_USER: (userId: number) => joinUrl(API_BASE, `/orders/user/${userId}`),
    GET_BY_ID: (orderId: number) => joinUrl(API_BASE, `/orders/${orderId}`),
    GET_BY_RESTAURANT: (restaurantId: number) => joinUrl(API_BASE, `/orders/restaurant/${restaurantId}`),
    UPDATE_STATUS: (orderId: number) => joinUrl(API_BASE, `/orders/${orderId}/status`),
    ROLLBACK: (orderId: number) => joinUrl(API_BASE, `/orders/rollback/${orderId}`),
  },

  PAYMENT: {
    CREATE_SESSION: joinUrl(API_BASE, '/api/payments/create-session'),
    GET_STATUS: (sessionId: string) => joinUrl(API_BASE, `/api/payments/status/${sessionId}`),
  },
} as const;
