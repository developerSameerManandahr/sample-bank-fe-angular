import {Component, OnInit} from '@angular/core';
import {getCurrency, getUser} from "../../helpers/helpers";
import {Router} from "@angular/router";
import {ExchangeService} from "../../servies/api/exchangeService";
import {Constant} from "../../helpers/constant";
import {AccountService} from "../../servies/api/AccountService";
import {BaseResponse} from "../../model/response/baseResponse";
import {AccountDetails} from "../../model/response/accountDetails";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
  providers: [ExchangeService, AccountService]

})
export class AsideComponent implements OnInit {

  public currentBalance: string | number = 0;
  public savingBalance: string | number = 0;
  public user: string = '';
  public accountNumber: string = '';

  constructor(
    private router: Router,
    private exchangeService: ExchangeService,
    private accountService: AccountService,
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

    this.accountService
      .getAccountDetails()
      .then((baseResponse: BaseResponse<AccountDetails>) => {
        const accountDetails: Array<AccountDetails> = baseResponse.results;
        const currentAccount = accountDetails.find((accountDetail) => accountDetail.accountType == 'CURRENT');
        const savingAccount = accountDetails.find((accountDetail) => accountDetail.accountType == 'SAVING');

        if (!(currentAccount && savingAccount)) {
          return;
        }
        if (currencyType != Constant.BASE_CURRENCY && currencyType) {
          this.convertCurrencyAndFormat(currencyType, currentAccount.balance, savingAccount.balance);

        } else {
          this.currentBalance = currentAccount.balance;
          this.savingBalance = savingAccount.balance;
        }
      })
      .catch(reason => {
        console.error(reason);
      })
    const number = localStorage.getItem("accountNumber");
    if (number) this.accountNumber = number;

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
          .then(balance => {
            this.savingBalance = balance.toFixed(2);
          });
      });
  }

}
