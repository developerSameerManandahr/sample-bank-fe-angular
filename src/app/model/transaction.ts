export interface Transaction {
  from: string;
  to: string;
  amount: string;
  date: number
}

export interface ParsedTransaction {
  transactionType: string;
  amount: string;
  date: Date,
  beneficiaryUser: string
}

export enum TransactionType {
  DR,
  CR
}
