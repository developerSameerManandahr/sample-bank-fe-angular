import {Component, OnInit} from '@angular/core';
import {getCurrentMainModel, getMainModelByUserName, updateMainModel} from "../../helpers/helpers";
import {MainModel} from "../../model/mainModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Transaction} from "../../model/transaction";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  public payToSomeone = true;
  public amountControl;
  public pinControl;
  public moveMoneyForm;
  public currentToSaving = true;
  public clicked = false;

  public sendMoneyAmountControl;
  public beneficiaryUsernameControl;
  public sendMoneyPinControl;
  public sendMoneyForm;
  public sendMoneyClicked = false;

  constructor() {
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

    this.beneficiaryUsernameControl = new FormControl('',
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
      username: this.beneficiaryUsernameControl
    });
  }

  ngOnInit(): void {
  }

  transfer() {
    if (this.clicked) {
      const mainModel: MainModel = getCurrentMainModel();
      if (mainModel.userDetails?.pin) {
        if (mainModel.userDetails.pin === this.pinControl.value) {
          this.transferAmount();
        } else {
          this.pinControl.setValue(null);
          alert("Pin doesn't match")
        }
      }
    }
    this.clicked = true;
  }

  private transferAmount() {
    const mainModel: MainModel = getCurrentMainModel();
    let balance = mainModel.balance;
    if (balance) {
      if (this.currentToSaving) {
        if (balance['CURRENT'] > this.amountControl.value) {
          balance['CURRENT'] -= this.amountControl.value;
          balance['SAVING'] += this.amountControl.value;
          updateMainModel(mainModel);
          alert('Amount transferred');
        } else {
          alert('Balance in current account is insufficient')
        }
      } else {
        if (balance['SAVING'] > this.amountControl.value) {
          balance['CURRENT'] += this.amountControl.value;
          balance['SAVING'] -= this.amountControl.value;
          updateMainModel(mainModel);
          alert('Amount transferred');
        } else {
          alert('Balance in saving account is insufficient')
        }
      }
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

  sendMoney() {
    if (this.sendMoneyClicked) {
      const mainModel: MainModel = getCurrentMainModel();
      if (mainModel.userDetails?.pin) {
        if (mainModel.userDetails.pin === this.sendMoneyPinControl.value) {
          const beneficiaryUsername = this.beneficiaryUsernameControl.value;
          if (beneficiaryUsername !== mainModel.userDetails.username) {
            if (localStorage.getItem(beneficiaryUsername)) {
              const amountTransferred = this.sendMoneyAmountControl.value;
              if (mainModel.balance && mainModel.balance['CURRENT'] > amountTransferred) {
                const beneficiaryMainModel = getMainModelByUserName(beneficiaryUsername);
                if (beneficiaryMainModel.balance && mainModel.balance) {
                  mainModel.balance['CURRENT'] -= amountTransferred;
                  beneficiaryMainModel.balance['CURRENT'] += amountTransferred;
                  updateMainModel(mainModel);
                  updateMainModel(beneficiaryMainModel);
                  const transaction: Transaction = {
                    amount: amountTransferred,
                    to: beneficiaryUsername,
                    from: mainModel.userDetails.username,
                    date: Date.now()
                  }
                  const transactionString = localStorage.getItem('transactions') ? localStorage.getItem('transactions') : '[]';
                  if (transactionString != null) {
                    const transactions: Array<Transaction> = JSON.parse(transactionString);
                    transactions.push(transaction);
                    localStorage.setItem('transactions', JSON.stringify(transactions));
                  }
                }
                alert('transferred');
              } else {
                alert('Insufficient balance, Either add money or transfer from saving to current')
              }
            } else {
              alert('no user found');
            }
          } else {
            alert('cannot transfer to yourself');
          }

        } else {
          this.sendMoneyPinControl.setValue(null);
          alert("Pin doesn't match")
        }
      }
    }
    this.sendMoneyClicked = true;
  }
}
