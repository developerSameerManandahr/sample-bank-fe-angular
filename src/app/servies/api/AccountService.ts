import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {AccountDetails} from "../../model/response/accountDetails";
import {BaseResponse} from "../../model/response/baseResponse";
import {getHeaders} from "../../helpers/helpers";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private httpClient: HttpClient
  ) {
  }


  public getAccountDetails(): Promise<BaseResponse<AccountDetails>> {
    const headers = getHeaders();
    const objectObservable = this.httpClient
      .get<BaseResponse<AccountDetails>>(environment.baseApiUrl + '/Account/Details', {
        headers
      });
    return firstValueFrom(objectObservable);
  }

}
