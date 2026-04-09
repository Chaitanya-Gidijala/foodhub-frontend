import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
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
import { OrderDetailsDialogComponent } from './components/orders/order-details-dialog.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddressSelectionComponent } from './components/address-selection/address-selection.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { EditAddressComponent } from './components/edit-address/edit-address.component';
import { FooterComponent } from './components/footer/footer.component';
import { CustomerSidebarComponent } from './components/customer-sidebar/customer-sidebar.component';
import { RestaurantSidebarComponent } from './components/restaurant-sidebar/restaurant-sidebar.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    RestaurantOwnerDashboardComponent,
    RestaurantListComponent,
    MenuItemsComponent,
    CartComponent,
    PaymentComponent,
    PaymentSuccessComponent,
    OrdersComponent,
    OrderDetailsDialogComponent,
    NavbarComponent,
    ProfileComponent,
    AddressSelectionComponent,
    AddressListComponent,
    AddAddressComponent,
    EditAddressComponent,
    FooterComponent,
    CustomerSidebarComponent,
    RestaurantSidebarComponent,
    AdminSidebarComponent,
    FavoritesComponent,
    WalletComponent,
    SettingsComponent,
    AboutComponent,
    ContactComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule,
    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDividerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
