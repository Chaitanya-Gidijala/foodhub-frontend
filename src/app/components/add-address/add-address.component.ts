import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AddressService } from '../../services/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  userId: number | null = null;
  returnUrl: string = '/addresses';
  
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
      this.address.fullName = user.username;
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/addresses';
  }

  saveAddress(): void {
    if (!this.isFormValid()) {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.addressService.addAddress(this.userId!, this.address).subscribe({
      next: () => {
        this.snackBar.open('Address added successfully', 'Close', { duration: 2000 });
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        this.snackBar.open('Error adding address', 'Close', { duration: 3000 });
      }
    });
  }

  isFormValid(): boolean {
    return !!(this.address.fullName && this.address.phoneNumber && 
             this.address.addressLine1 && this.address.city && 
             this.address.state && this.address.pincode);
  }

  cancel(): void {
    this.router.navigateByUrl(this.returnUrl);
  }
}