import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public async register() : Promise<Boolean>
  {
    if(await this.loginService.emailExists(this.email.value))
    {
      this.snackBar.open('Email already registered!', 'Dismiss', {
        duration: 3000
      });
      return false;
    }

    if(await this.loginService.registerUser(this.email.value, this.password.value)) {
      this.router.navigate(['/login']);
      this.snackBar.open('Registration successful! Please Login!', 'OK', {
        duration: 3000
      });
      return true;
    }
    else {
      this.snackBar.open('Registration failed!', 'Dismiss', {
        duration: 3000
      });
      return false;
    }
  }

}
