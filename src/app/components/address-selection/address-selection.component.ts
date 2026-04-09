// Premium Address Selection - Updated
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AddressService } from '../../services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-selection',
  templateUrl: './address-selection.component.html',
  styleUrls: ['./address-selection.component.css']
})
export class AddressSelectionComponent implements OnInit {
  addresses: any[] = [];
  selectedAddressId: number | null = null;
  userId: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private addressService: AddressService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromStorage();
    if (user) {
      this.userId = user.id!;
      this.loadAddresses();
    }
  }

  loadAddresses(): void {
    this.addressService.getUserAddresses(this.userId!).subscribe({
      next: (addresses) => {
        this.addresses = addresses;
        const defaultAddress = addresses.find(addr => addr.isDefault);
        if (defaultAddress) {
          this.selectedAddressId = defaultAddress.id;
        }
      },
      error: (err) => {
        this.snackBar.open('Error loading addresses', 'Close', { duration: 3000 });
      }
    });
  }

  selectAddress(addressId: number): void {
    this.selectedAddressId = addressId;
  }

  goBack(): void {
    this.router.navigate(['/cart']);
  }

  proceedToPayment(): void {
    if (!this.selectedAddressId) {
      this.snackBar.open('Please select an address', 'Close', { duration: 3000 });
      return;
    }
    this.router.navigate(['/payment'], { queryParams: { addressId: this.selectedAddressId } });
  }

  addNewAddress(): void {
    this.router.navigate(['/add-address'], { queryParams: { returnUrl: '/address-selection' } });
  }

  editAddress(addressId: number): void {
    this.router.navigate(['/edit-address', addressId]);
  }
}