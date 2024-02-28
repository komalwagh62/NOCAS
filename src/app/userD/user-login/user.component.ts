import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  email: string = '';
  password: string = '';
  passwordFieldType: string = 'password'; // Track the type of password field

  constructor(private router: Router) {}

  // Method to handle user login
  login(): void {
    // Implement login functionality here
  }

  // This method toggles the password visibility
  togglePasswordVisibility(): void {
    this.passwordFieldType = (this.passwordFieldType === 'password') ? 'text' : 'password';
  }

  // Method to handle forgot password
  forgotPassword(): void {
    // Navigate to the forgot password page or implement your logic here
    // this.router.navigate(['/forgot-password']);
  }
}
