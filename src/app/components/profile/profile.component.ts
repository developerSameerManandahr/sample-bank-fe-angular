import {Component, OnInit} from '@angular/core';
import {getStringItem, isSuccessFull} from "../../helpers/helpers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../servies/api/UserService";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  public updateInfoForm;

  public username = '';
  public firstName = '';
  public middleName = '';
  public lastName = '';
  public address = '';
  public phoneNumber = '';

  public lastNameControl;
  public firstNameControl;
  public middleNameControl;
  public userControl;
  public addressControl;
  public phoneNumberControl;

  public editClicked = false;

  constructor(
    private userService: UserService
  ) {
    this.username = getStringItem('currentUser')
    this.firstName = getStringItem('firstName');
    this.middleName = getStringItem('middleName');
    this.lastName = getStringItem('lastName');
    this.address = getStringItem('address');
    this.phoneNumber = getStringItem('phoneNumber');

    this.userControl = new FormControl({
        value: this.username,
        disabled: true
      },
      [
        Validators.required,
      ]);
    this.firstNameControl = new FormControl({
        value: this.firstName,
        disabled: true
      },
      [
        Validators.required
      ]);
    this.lastNameControl = new FormControl({
        value: this.lastName,
        disabled: true
      },
      [
        Validators.required
      ]);
    this.addressControl = new FormControl({
        value: this.address,
        disabled: true
      },
      [
        Validators.required
      ]);
    this.phoneNumberControl = new FormControl({
        value: this.phoneNumber,
        disabled: true
      },
      [
        Validators.required
      ]);
    this.middleNameControl = new FormControl({
      value: this.middleName,
      disabled: true
    });

    this.updateInfoForm = new FormGroup({
      username: this.userControl,
      firstName: this.firstNameControl,
      middleName: this.middleNameControl,
      lastName: this.lastNameControl,
      address: this.addressControl,
      phoneNumber: this.phoneNumberControl
    });
  }

  ngOnInit(): void {
  }

  async editClick() {
    if (!this.editClicked) {
      this.editClicked = true;

      this.addressControl.enable();
      this.phoneNumberControl.enable();
    }else {
      const details = await this.userService.updateUserDetails({
        address: this.addressControl.value,
        phoneNumber: this.phoneNumberControl.value
      });
      if (isSuccessFull(details)) {
        alert('Updated Successfully');
        this.editClicked = false;
      }
    }
  }

}
