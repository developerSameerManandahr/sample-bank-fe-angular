import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {getHeaders} from "../../helpers/helpers";
import {UpdateUserDetails} from "../../model/request/UpdateUserDetails";
import {BaseResponse} from "../../model/response/baseResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public updateUserDetails(request: UpdateUserDetails) {
    const objectObservable = this.httpClient.put<BaseResponse<any>>(environment.baseApiUrl + "/user/update/details", request, {
      headers: getHeaders()
    });
    return firstValueFrom(objectObservable);
  }
}
