export interface SignUpCredentials extends DefaultLoginCredentials, AccountLoginCredentials {
  firstName:string;
  middleName?:string;
  lastName:string;
}

export interface DefaultLoginCredentials {
  username: string;
  password: string;
}

export interface AccountLoginCredentials {
  accountNumber: string;
  pin: string;
}
