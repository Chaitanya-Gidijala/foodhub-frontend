import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AddressService } from '../../services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  addresses: any[] = [];
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
      },
      error: (err) => {
        this.snackBar.open('Error loading addresses', 'Close', { duration: 3000 });
      }
    });
  }

  addNewAddress(): void {
    this.router.navigate(['/add-address']);
  }

  editAddress(addressId: number): void {
    this.router.navigate(['/edit-address', addressId]);
  }

  deleteAddress(addressId: number): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(addressId, this.userId!).subscribe({
        next: () => {
          this.snackBar.open('Address deleted', 'Close', { duration: 2000 });
          this.loadAddresses();
        },
        error: (err) => {
          this.snackBar.open('Error deleting address', 'Close', { duration: 3000 });
        }
      });
    }
  }

  setAsDefault(addressId: number): void {
    this.addressService.setDefaultAddress(addressId, this.userId!).subscribe({
      next: () => {
        this.snackBar.open('Default address updated', 'Close', { duration: 2000 });
        this.loadAddresses();
      },
      error: (err) => {
        this.snackBar.open('Error updating default address', 'Close', { duration: 3000 });
      }
    });
  }
}