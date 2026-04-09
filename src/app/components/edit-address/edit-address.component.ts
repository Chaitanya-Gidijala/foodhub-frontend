import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AddressService } from '../../services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  userId: number | null = null;
  addressId: number | null = null;
  
  address = {
    addressType: 'HOME',
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false,
    label: ''
  };

  addressTypes = ['HOME', 'WORK', 'OTHER'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private addressService: AddressService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromStorage();
    if (user) {
      this.userId = user.id!;
      this.addressId = Number(this.route.snapshot.params['id']);
      this.loadAddress();
    }
  }

  loadAddress(): void {
    this.addressService.getUserAddresses(this.userId!).subscribe({
      next: (addresses) => {
        const foundAddress = addresses.find(addr => addr.id === this.addressId);
        if (foundAddress) {
          this.address = { ...foundAddress };
        }
      },
      error: (err) => {
        this.snackBar.open('Error loading address', 'Close', { duration: 3000 });
      }
    });
  }

  updateAddress(): void {
    if (!this.isFormValid()) {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.addressService.updateAddress(this.addressId!, this.userId!, this.address).subscribe({
      next: () => {
        this.snackBar.open('Address updated successfully', 'Close', { duration: 2000 });
        this.router.navigate(['/addresses']);
      },
      error: (err) => {
        this.snackBar.open('Error updating address', 'Close', { duration: 3000 });
      }
    });
  }

  isFormValid(): boolean {
    return !!(this.address.fullName && this.address.phoneNumber && 
             this.address.addressLine1 && this.address.city && 
             this.address.state && this.address.pincode);
  }

  cancel(): void {
    this.router.navigate(['/addresses']);
  }
}