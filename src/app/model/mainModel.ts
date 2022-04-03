import {SignUpCredentials} from "./User";

export interface MainModel {
  userDetails?: SignUpCredentials;
  balance?: Balance;
  currency?: string;
}

interface Balance {
  [key: string]: number;
}


