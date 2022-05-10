import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {PayRequest} from "../../model/request/payRequest";
import {ManageFundRequest} from "../../model/request/manageFundRequest";
import {BaseResponse} from "../../model/response/baseResponse";
import {getHeaders} from "../../helpers/helpers";

@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public pay(request: PayRequest) {
    const objectObservable = this.httpClient.post<BaseResponse<any>>(environment.baseApiUrl + "/Pay/someone", request, {
      headers: getHeaders()
    });
    return firstValueFrom(objectObservable);
  }


  public manageFund(request: ManageFundRequest) {
    const objectObservable = this.httpClient.post<BaseResponse<any>>(environment.baseApiUrl + "/Pay/manage/fund", request, {
      headers: getHeaders()
    });
    return firstValueFrom(objectObservable);
  }

}
