import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import {FormControl, Validators} from '@angular/forms';
import { LoginService } from '../login.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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

  public async login() : Promise<Boolean>
  {
    if(await this.loginService.loginUser(this.email.value, this.password.value)) {
      this.router.navigate(['/']);
      return true;
    }
    else {
      this.snackBar.open('Wrong login!', 'Dismiss', {
        duration: 3000
      });
      
      return false;
    }
  }

}
