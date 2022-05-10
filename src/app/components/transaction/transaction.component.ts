import {Component, OnInit} from '@angular/core';
import {ParsedTransaction, Transaction} from "../../model/transaction";
import {getUser} from "../../helpers/helpers";
import {TransactionService} from "../../servies/api/TransactionService";
import {TransactionResponse} from "../../model/response/transactionResponse";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
  providers: [TransactionService]
})
export class TransactionComponent implements OnInit {

  private transactions: Array<Transaction> = [];
  public parsedTransactions: Array<TransactionResponse> = [];

  constructor(private transactionService: TransactionService) {
    transactionService.viewTransactions()
      .then((response) => {
        this.parsedTransactions = response.results;
      })

  }

  ngOnInit(): void {
  }

}
