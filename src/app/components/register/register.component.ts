import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  role = 'CUSTOMER';
  panCardNumber = '';
  fssaiLicenseNumber = '';
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  register(): void {
    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role,
      panCardNumber: this.panCardNumber,
      fssaiLicenseNumber: this.fssaiLicenseNumber
    };

    this.authService.register(registerData)
      .subscribe({
        next: (message) => {
          this.snackBar.open(message + ' Please login to continue.', 'Close', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.snackBar.open('Registration failed: ' + err.error, 'Close', { duration: 3000 });
        }
      });
  }
}
