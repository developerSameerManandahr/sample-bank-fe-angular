import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {isSuccessFull, validatorForPin} from "../../helpers/helpers";
import {AuthService} from "../../servies/api/AuthService";

@Component({
  selector: 'app-update-pin',
  templateUrl: './update-pin.component.html',
  styleUrls: ['./update-pin.component.css'],
  providers: [AuthService]
})
export class UpdatePinComponent implements OnInit {

  public updatePinForm;
  public pinControl;
  public oldPinControl;
  public reEnterPinControl;

  constructor(
    private service: AuthService
  ) {
    this.oldPinControl = new FormControl('',
      validatorForPin
    );
    this.pinControl = new FormControl('',
      validatorForPin
    );
    this.reEnterPinControl = new FormControl('',
      validatorForPin
    );
    this.updatePinForm = new FormGroup({
      oldPin: this.oldPinControl,
      newPin: this.pinControl,
      reEnterNewPin: this.reEnterPinControl
    });
  }

  ngOnInit(): void {
  }

  formIsValid() {
    return this.updatePinForm.valid && (this.pinControl.value == this.reEnterPinControl.value)
  }

  changePin() {
    return this.service.updatePin({
      newPin: this.pinControl.value,
      oldPin: this.oldPinControl.value
    })
      .then((response) => {
        if (isSuccessFull(response)) {
          this.pinControl.setValue('');
          this.oldPinControl.setValue('');
          this.reEnterPinControl.setValue('');
          alert('Pin changed');
        }
      }).catch(reason => {
        console.log(reason);
        alert('Pin change unsuccessful');
      })
  }

  checkForPattern() {
    return this.pinControl.errors?.['pattern'] ||
      this.oldPinControl.errors?.['pattern'] ||
      this.reEnterPinControl.errors?.['pattern'];
  }

}
