import {Component, OnInit} from '@angular/core';
import {MainModel} from "../../model/mainModel";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm;

  public userControl;
  public passwordControl;
  public reEnterPasswordControl;
  public pinControl;
  public reEnterPinControl;
  public firstNameControl;
  public lastNameControl;

  constructor(private router: Router) {
    this.userControl = new FormControl('',
      [
        Validators.required
      ]);
    this.passwordControl = new FormControl('',
      [
        Validators.required,
        Validators.minLength(8)
      ]);
    this.reEnterPasswordControl = new FormControl('',
      [
        Validators.required,
        Validators.minLength(8)
      ]);
    this.pinControl = new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^[0-9]*$")
      ]
    );
    this.reEnterPinControl = new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern("^[0-9]*$")
      ]
    );
    this.lastNameControl = new FormControl('',
      [
        Validators.required
      ]);
    this.firstNameControl = new FormControl('',
      [
        Validators.required
      ]);
    let middleNameControl = new FormControl('');
    this.signUpForm = new FormGroup({
      username: this.userControl,
      password: this.passwordControl,
      rePassword: this.reEnterPasswordControl,
      pin: this.pinControl,
      rePin: this.reEnterPinControl,
      firstName: this.firstNameControl,
      middleName: middleNameControl,
      lastName: this.lastNameControl,
    });
  }


  ngOnInit(): void {
  }

  async signUp(): Promise<void> {
    await this.router.navigate(['/dashboard']);
  }

  onSubmit(): Promise<any> {
    const username = this.userControl.value;
    if (localStorage.getItem(username)) {
      alert('Username Already used');
      throw new Error('Username Already used');
    }

    const model: MainModel = {
      userDetails: {
        pin: this.pinControl.value,
        password: this.passwordControl.value,
        firstName: this.firstNameControl.value,
        lastName: this.lastNameControl.value,
        middleName: '',
        username: username,
        accountNumber: this.generateAccountNumber(10)
      },
      balance: {
        CURRENT: 0,
        SAVING: 0
      },
      currency: 'GBP',
    };
    localStorage.setItem(username, JSON.stringify(model));
    localStorage.setItem('currentUser', username);
    return this.router.navigate(['/dashboard']);
  }

  generateAccountNumber(n: number): string {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

    if (n > max) {
      return this.generateAccountNumber(max) + this.generateAccountNumber(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10; // Math.pow(10, n) basically
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
  }

  validateUsername() {
    return this.userControl.touched && this.userControl.errors?.['required'];
  }

  validateEqualPassword() {
    return this.passwordControl.value == this.reEnterPasswordControl.value;
  }

  validateEqualPin() {
    return this.pinControl.value == this.reEnterPinControl.value;
  }
}
