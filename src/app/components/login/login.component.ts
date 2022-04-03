import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MainModel} from "../../model/mainModel";
import {SignUpCredentials} from "../../model/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginByPin = false;
  private loggedId = false;
  public username = '';
  public password = '';
  public pin = '';
  public accountNumber = '';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  loginByPIN() {
    this.loginByPin = true;
  }


  loginByPassword() {
    this.loginByPin = false;
  }

  async login() {
    if (this.loginByPin) {
      for (let item in localStorage) {
        const item1 = localStorage.getItem(item) ? localStorage.getItem(item) : '';
        if (item1 && item != 'currentUser') {
          let parse = JSON.parse(item1);

          const userDetails1: SignUpCredentials = parse.userDetails;
          if (userDetails1) {
            if (userDetails1.pin === this.pin &&
              userDetails1.accountNumber === this.accountNumber) {
              localStorage.setItem('currentUser', userDetails1.username);
              this.loggedId = true;
              await this.router.navigate(['/dashboard']);
            }
          }
        }
      }
      if (!this.loggedId) {
        alert('Invalid credentials');
      }
    } else {
      let mainString = localStorage.getItem(this.username);
      if (mainString) {
        const main: MainModel = JSON.parse(mainString);
        let userDetails = main.userDetails;
        if (userDetails && userDetails.password === this.password) {
          localStorage.setItem('currentUser', this.username);
          await this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('Invalid credentials');
      }
    }

  }
}
