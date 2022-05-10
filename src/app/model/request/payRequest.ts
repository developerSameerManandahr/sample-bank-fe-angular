export interface PayRequest {
  to: To;
  amount: 0;
  description: string;
  pin: string;
}

export interface To {
  fullName: string;
  accountNumber: string;
}
