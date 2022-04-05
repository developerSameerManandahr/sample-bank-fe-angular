import {Component, OnInit} from '@angular/core';
import {getCurrency, getCurrentMainModel, getUser} from "../../helpers/helpers";
import {Router} from "@angular/router";
import {ExchangeService} from "../../servies/exchangeService";
import {Constant} from "../../helpers/constant";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  providers: [ExchangeService]

})
export class AsideComponent implements OnInit {

  public currentBalance: string | number = 0;
  public savingBalance: string | number = 0;
  public user: string = '';
  public accountNumber: string = '';

  constructor(
    private router: Router,
    private exchangeService: ExchangeService,
  ) {

  }

  public currencyType = '';

  ngOnInit(): void {
    let user1 = getUser();
    const currencyType = localStorage.getItem('currency');
    if (currencyType)
      this.currencyType = getCurrency(currencyType);
    if (user1)
      this.user = user1;
    const currentMainModel = getCurrentMainModel();
    const currentMainBalance = currentMainModel.balance;
    if (currentMainBalance) {
      let currentBalance = currentMainBalance['CURRENT'];
      let savingBalance = currentMainBalance['SAVING'];
      if (currencyType != Constant.BASE_CURRENCY && currencyType) {
        this.convertCurrencyAndFormat(currencyType, currentBalance, savingBalance);

      } else {
        this.currentBalance = currentBalance;
        this.savingBalance = savingBalance;
      }
    }
    const userDetails = currentMainModel.userDetails;
    if (userDetails)
      this.accountNumber = userDetails.accountNumber;
  }

  /**
   * Logs out the current user by removing the user from localstorage
   */
  logout(): Promise<boolean> {
    localStorage.removeItem('currentUser');
    return this.router.navigate(['/login']);
  }

  /**
   * Used while selecting the currency in ui
   */
  selectCurrency(currency: string) {
    this.currencyType = getCurrency(currency);
    localStorage.setItem('currency', currency);
    window.location.reload();
  }

  /**
   * uses the service to convert the currency and formats it
   */
  private convertCurrencyAndFormat(currencyType: string, currentBalance: number, savingBalance: number) {
    this.exchangeService.convert(currencyType, currentBalance)
      .then(value => {
        this.currentBalance = value.toFixed(2);
      })
      .then(value => {
        this.exchangeService.convert(currencyType, savingBalance)
          .then(value => {
            this.savingBalance = value.toFixed(2);
          });
      });
  }

}
