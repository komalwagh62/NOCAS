import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { ApiService } from '../../Server/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  
  
  registrationForm!: FormGroup | any;
  generatedOTP: string | undefined;
  otpSent: boolean = false;
  phoneNumberUtil = PhoneNumberUtil.getInstance();
  

  constructor(private toastr: ToastrService,private api: ApiService,private router: Router) { }

  ngOnInit(): void {
    // this.toastr.success('Welcome ✈️', 'Hey There..👋🏻', {
    //   timeOut: 3000,
    // });
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      Address: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', [Validators.required]),
      otp: new FormControl('', [Validators.required, Validators.pattern(/^\d{4}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });

    this.generateUniqueId();
    this.getCurrentDateTime();
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      // Call the postDataToAWS method from the ApiService to store the data in the database
      this.api.postDataToAWS(this.registrationForm.value)
        .subscribe({
          next: () => {
            // Reset the form after successful submission
            this.registrationForm.reset();
            // Show success message
            this.toastr.success('Registration successful', 'Success');
          },
          error: () => {
            // Show error message if data couldn't be stored
            this.toastr.error('Failed to register. Please try again later.', 'Error');
          }
        });
    } else {
      // Show error message if form is incomplete
      this.toastr.error('Please fill all required fields', 'Error');
    }
  }
  onPhoneNumberChange(): void {
    const phoneNumberControl = this.registrationForm.get('PhoneNumber');
    let phoneNumberString: string = phoneNumberControl.value.trim();
    const countryCode = 'IN'; // Country code for India

    // Check if the phone number field is not empty and is valid
    if (phoneNumberControl && phoneNumberControl.valid) {
      // Remove spaces, hyphens, and plus sign if present
      phoneNumberString = phoneNumberString.replace(/[\s-+]/g, '');

      // Validate Indian phone numbers with a regular expression
      const isValid = /^()?[789]\d{9}$/.test(phoneNumberString);

      if (isValid) {
        console.log('Phone number is valid:', phoneNumberString);
        // Perform OTP generation here
        this.generateOTP();
        this.otpSent = true;
      } else {
        alert('Invalid Phone Number');
        this.otpSent = false;
      }
    } else {
      this.otpSent = false;
    }
  }

  generateOTP() {
    // Generate a random 4-digit OTP
    this.generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    // Display OTP in an alert
    alert('Generated OTP: ' + this.generatedOTP);
  }

  validateOTP(): void {
    // Get the entered OTP from the form
    const enteredOTP = this.registrationForm.get('otp')?.value;
  
    // Check if the entered OTP matches the generated OTP
    if (enteredOTP === this.generatedOTP) {
      this.toastr.success('OTP verification successful', 'Success');
    } else {
       alert('Invalid OTP. Please try again');
    }
}


  generateUniqueId(): void {
    const uniqueId = Math.floor(Math.random() * 1000000).toString();
    this.registrationForm.get('uniqueId')?.setValue(uniqueId);
  }

  getCurrentDateTime(): void {
    const dateTime = new Date().toLocaleString();
    this.registrationForm.get('dateTime')?.setValue(dateTime);
  }
}
