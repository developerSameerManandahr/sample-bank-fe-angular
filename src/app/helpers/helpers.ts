import {MainModel} from "../model/mainModel";

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

export function  getCurrency(currency: string) {
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
