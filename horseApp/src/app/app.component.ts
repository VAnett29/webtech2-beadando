import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webtech2-horses';
  loggedIn: Boolean = false;

  constructor(public loginService: LoginService, private router: Router) { }
  ngOnInit(): void {
    this.loggedIn = this.loginService.isLoggedIn();
    this.router.navigate(['/']);
  }

  public logout()
  {
    if(this.loginService.logoutUser())
    {
      this.router.navigate(['/']);
    }
  }
}
