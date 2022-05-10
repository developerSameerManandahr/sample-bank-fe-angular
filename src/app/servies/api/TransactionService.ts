import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {BaseResponse} from "../../model/response/baseResponse";
import {getHeaders} from "../../helpers/helpers";
import {TransactionResponse} from "../../model/response/transactionResponse";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public viewTransactions() {
    const objectObservable = this.httpClient.get<BaseResponse<TransactionResponse>>(environment.baseApiUrl + "/transaction/view", {
      headers: getHeaders()
    });
    return firstValueFrom(objectObservable);
  }
}
