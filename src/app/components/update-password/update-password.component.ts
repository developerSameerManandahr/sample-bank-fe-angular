import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {isSuccessFull, validatorForPassword} from "../../helpers/helpers";
import {AuthService} from "../../servies/api/AuthService";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
  providers: [AuthService]
})
export class UpdatePasswordComponent implements OnInit {

  public updatePasswordForm;
  public passwordControl;
  public oldPasswordControl;
  public reEnterPasswordControl;

  constructor(
    private service: AuthService
  ) {
    this.oldPasswordControl = new FormControl('',
      validatorForPassword
    );
    this.passwordControl = new FormControl('',
      validatorForPassword
    );
    this.reEnterPasswordControl = new FormControl('',
      validatorForPassword
    );
    this.updatePasswordForm = new FormGroup({
      oldPassword: this.oldPasswordControl,
      newPassword: this.passwordControl,
      reEnterNewPassword: this.reEnterPasswordControl
    });
  }

  ngOnInit(): void {
  }

  isFormValid() {
    return this.updatePasswordForm.valid && (this.passwordControl.value == this.reEnterPasswordControl.value);
  }

  changePassword() {
    return this.service.updatePassword({
      newPassword: this.passwordControl.value,
      oldPassword: this.oldPasswordControl.value
    })
      .then((response) => {
        if (isSuccessFull(response)) {
          this.passwordControl.setValue('');
          this.oldPasswordControl.setValue('');
          this.reEnterPasswordControl.setValue('');
          alert('Password changed');
        }
      }).catch(reason => {
        console.log(reason);
        alert('Password change unsuccessful');
      })
  }

}
