import {Component, OnInit} from '@angular/core';
import {isSuccessFull} from "../../helpers/helpers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../servies/api/AuthService";
import {PayService} from "../../servies/api/PayService";
import {BaseResponse} from "../../model/response/baseResponse";
import {Router} from "@angular/router";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  providers: [AuthService, PayService]
})
export class TransferComponent implements OnInit {

  public currencyType = '£';
  public payToSomeone = true;
  public amountControl;
  public pinControl;
  public moveMoneyForm;
  public currentToSaving = true;
  public clicked = false;

  public sendMoneyAmountControl;
  public accountNumberControl;
  public fullNameControl;
  public sendMoneyPinControl;
  public sendMoneyForm;
  public sendMoneyClicked = false;


  constructor(
    private authService: AuthService,
    private payService: PayService,
    private router: Router
  ) {
    const currency = localStorage.getItem('currency');
    if (currency) {
      switch (currency) {
        default:
        case 'GBP':
          this.currencyType = '£';
          break;
        case 'USD':
          this.currencyType = '$';
          break;
        case 'EUR':
          this.currencyType = '€';
          break;
      }
    }
    this.amountControl = new FormControl('',
      [
        Validators.required,
        Validators.min(5)
      ]);

    this.pinControl = new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
      ]);

    this.moveMoneyForm = new FormGroup({
      amount: this.amountControl
    });

    this.sendMoneyAmountControl = new FormControl('',
      [
        Validators.required,
        Validators.min(5)
      ]);

    this.accountNumberControl = new FormControl('',
      [
        Validators.required,
      ]);

    this.fullNameControl = new FormControl('',
      [
        Validators.required,
      ]);

    this.sendMoneyPinControl = new FormControl('',
      [
        Validators.required,
        Validators.minLength(6),
      ]);

    this.sendMoneyForm = new FormGroup({
      amount: this.sendMoneyAmountControl,
      accountNumber: this.accountNumberControl,
      fullName: this.fullNameControl,
    });
  }

  ngOnInit(): void {
  }

  async transfer() {
    try {
      if (this.clicked) {
        const baseResponse = await this.payService.manageFund({
          amount: this.amountControl.value,
          fromAccountType: this.currentToSaving ? 'CURRENT' : 'SAVING',
          toAccountType: this.currentToSaving ? 'SAVING' : 'CURRENT',
          pin: this.pinControl.value
        });
        if (isSuccessFull(baseResponse)) alert('fund transferred');
      }
      this.clicked = true;
    } catch (ex: any) {
      await this.handleException(ex);
    }

  }

  validate(): boolean {
    if (!this.clicked) {
      return !this.moveMoneyForm.valid;
    } else {
      return !this.pinControl.valid;
    }
  }

  validateSendMoney(): boolean {
    if (!this.sendMoneyClicked) {
      return !this.sendMoneyForm.valid;
    } else {
      return !this.sendMoneyPinControl.valid;
    }
  }

  selectCurrentToSaving() {
    this.currentToSaving = true;
  }

  selectSavingToCurrent() {
    this.currentToSaving = false;
  }

  payToSomeoneClick() {
    this.payToSomeone = true;
  }

  manageFundClick() {
    this.payToSomeone = false;
  }

  async sendMoney() {
    if (this.sendMoneyClicked) {
      try {
        const authenticationResponse: BaseResponse<any> = await this.authService.verifyPIN({
          pin: this.sendMoneyPinControl.value
        });
        if (authenticationResponse.messageType == 'Success') {
          const baseResponse: BaseResponse<any> = await this.payService.pay({
            to: {
              fullName: this.fullNameControl.value,
              accountNumber: this.accountNumberControl.value
            },
            amount: this.sendMoneyAmountControl.value,
            description: '',
            pin: this.sendMoneyPinControl.value
          });
          if (isSuccessFull(baseResponse)) alert('Successfully transfer')
        }
      } catch (ex: any) {
        await this.handleException(ex);
      }
    }

    const response = await this.authService.verifyAccountDetails({
      accountNumber: this.accountNumberControl.value,
      fullName: this.fullNameControl.value,
      pin: this.sendMoneyPinControl.value
    });

    if (isSuccessFull(response)) {
      this.sendMoneyClicked = true;
    }
  }

  private async handleException(ex: any) {
    {
      let message = ex.error.message;
      if (ex.error && message) {
        alert(message);
        if (message == 'Unauthorized') {
          localStorage.removeItem('currentUser');
          await this.router.navigate(['/login']);
        }
      }
    }
  }
}
