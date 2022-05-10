import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignupRequest} from "../../model/request/signupRequest";
import {AuthService} from "../../servies/api/AuthService";
import {setAuthValues} from "../../helpers/helpers";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
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

  constructor(
    private router: Router,
    private service: AuthService,
  ) {
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
    const signupRequest: SignupRequest = {
      pin: this.pinControl.value,
      password: this.passwordControl.value,
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value,
      middleName: '',
      username: this.userControl.value,
      address: 'preston',
      phoneNumber: '07585564123'
    };

    return this.service.signUp(signupRequest)
      .then((authResponse) => {
        setAuthValues(authResponse);
      })
      .then(() => this.router.navigate(['/dashboard']))
      .catch(reason => {
        console.debug(reason);
        alert('Cannot create a user with given credentials')
      })
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
