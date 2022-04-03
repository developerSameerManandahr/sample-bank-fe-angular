import {Component, OnInit} from '@angular/core';
import {ParsedTransaction, Transaction} from "../../model/transaction";
import {getUser} from "../../helpers/helpers";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  private transactions: Array<Transaction> = [];
  public parsedTransactions: Array<ParsedTransaction> = [];

  constructor() {
    const transactionString = localStorage.getItem('transactions') ? localStorage.getItem('transactions') : '[]';
    if (transactionString != null) {
      this.transactions = JSON.parse(transactionString);

      let username = getUser() ? getUser() : '';
      if (username) {
        this.parsedTransactions = this.transactions
          .filter((transaction: Transaction) => {
            return transaction.from === username || transaction.to
          })
          .map((transaction: Transaction) => {
            if (transaction.from === username) {
              const parsedTransaction: ParsedTransaction = {
                date: new Date(transaction.date),
                transactionType: 'DR',
                amount: '-' + transaction.amount,
                beneficiaryUser: transaction.to
              }
              return parsedTransaction;
            } else {
              const parsedTransaction: ParsedTransaction = {
                date: new Date(transaction.date),
                transactionType: 'CR',
                amount: transaction.amount,
                beneficiaryUser: transaction.from
              }
              return parsedTransaction;
            }
          });

      }

    }
  }

  ngOnInit(): void {
  }

}
