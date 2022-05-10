import {MainModel} from "../model/mainModel";
import {AuthenticationResponse} from "../model/response/authenticationResponse";
import {HttpHeaders} from "@angular/common/http";
import {BaseResponse} from "../model/response/baseResponse";

export function getUser() {
  return localStorage.getItem('currentUser');
}

export function getCurrentMainModel(): MainModel {
  let mainModel: MainModel;
  const currentUser = getUser();
  if (currentUser) {
    const mainModelString = localStorage.getItem(currentUser);
    if (mainModelString) {
      mainModel = JSON.parse(mainModelString)
      return mainModel;
    }
  }
  return {};
}

export function getStringItem(key: string): string {
  let item = localStorage.getItem(key);
  return item != null ? item : "";
}

export function getMainModelByUserName(name: string): MainModel {
  let mainModel: MainModel;
  const mainModelString = localStorage.getItem(name);
  if (mainModelString) {
    mainModel = JSON.parse(mainModelString)
    return mainModel;
  }
  return {};
}

export function updateMainModel(mainModel: MainModel) {
  if (mainModel.userDetails) {
    localStorage.setItem(mainModel.userDetails.username, JSON.stringify(mainModel));
  }
}

export function setAuthValues(authResponse: AuthenticationResponse) {
  localStorage.setItem("token", authResponse.token);
  localStorage.setItem("accountNumber", authResponse.accountNumber);
  localStorage.setItem("firstName", authResponse.firstName);
  localStorage.setItem("middleName", authResponse.middleName);
  localStorage.setItem("lastName", authResponse.lastName);
  localStorage.setItem("currentUser", authResponse.userName);
}

export function getCurrency(currency: string) {
  let currencyType = '£';
  if (currency) {
    switch (currency) {
      default:
      case 'GBP':
        currencyType = '£';
        break;
      case 'USD':
        currencyType = '$';
        break;
      case 'EUR':
        currencyType = '€';
        break;
    }
  }
  return currencyType;
}

export function getHeaders() {
  return new HttpHeaders().append("Authorization", "Bearer " + localStorage.getItem("token"));
}

export function isSuccessFull(baseResponse: BaseResponse<any>) {
  return baseResponse.messageType == 'Success';
}
