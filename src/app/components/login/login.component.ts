import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../servies/api/AuthService";
import {setAuthValues} from "../../helpers/helpers";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  public loginByPin = false;
  public username = '';
  public password = '';
  public pin = '';
  public accountNumber = '';

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {}

  loginByPIN() {
    this.loginByPin = true;
  }


  loginByPassword() {
    this.loginByPin = false;
  }

  async login() {
    if (this.loginByPin) {
      await this.authenticateWithPin();
    } else {
      await this.authenticateWithPassword();
    }

  }

  private async authenticateWithPassword() {
    return this.authService
      .loginByUsername({
        password: this.password,
        username: this.username
      })
      .then(async authResponse => {
        setAuthValues(authResponse);
        await this.router.navigate(['/dashboard']);
      })
      .catch(() => {
        alert('Invalid credentials')
      });
  }


  private authenticateWithPin() {
    return this.authService.loginByAccountNumber({
      Pin: this.pin,
      accountNumber: this.accountNumber
    }).then((authResponse) => {
      setAuthValues(authResponse);
    }).then(() => {
      return this.router.navigate(['/dashboard']);
    })
      .catch(() => alert('Invalid credentials'))
  }

  async signup() {
    await this.router.navigate(['/signup']);
  }
}
