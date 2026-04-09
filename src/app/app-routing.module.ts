import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { RestaurantOwnerDashboardComponent } from './components/restaurant-owner-dashboard/restaurant-owner-dashboard.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddressSelectionComponent } from './components/address-selection/address-selection.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [authGuard] },
  { path: 'restaurant-owner-dashboard', component: RestaurantOwnerDashboardComponent, canActivate: [authGuard] },
  { path: 'restaurants', component: RestaurantListComponent },
  { path: 'menu/:name', component: MenuItemsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentComponent, canActivate: [authGuard] },
  { path: 'payment-success', component: PaymentSuccessComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'address-selection', component: AddressSelectionComponent, canActivate: [authGuard] },
  { path: 'addresses', component: AddressListComponent, canActivate: [authGuard] },
  { path: 'add-address', component: AddAddressComponent, canActivate: [authGuard] },
  { path: 'edit-address/:id', component: EditAddressComponent, canActivate: [authGuard] },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'wallet', component: WalletComponent, canActivate: [authGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'faq', component: FaqComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
