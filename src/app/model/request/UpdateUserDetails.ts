export interface UpdateUserDetails {
  address: string;
  phoneNumber: string;
}

export interface UpdatePasswordRequest{
  oldPassword: string;
  newPassword: string;
}

export interface UpdatePinRequest{
  oldPin: string;
  newPin: string;
}
