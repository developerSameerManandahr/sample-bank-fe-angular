import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {VerifyPinRequest} from "../../model/request/verifyPinRequest";
import {SignupRequest} from "../../model/request/signupRequest";
import {AuthenticateRequest} from "../../model/request/authenticateRequest";
import {AuthenticatePinRequest} from "../../model/request/authenticatePinRequest";
import {AuthenticationResponse} from "../../model/response/authenticationResponse";
import {VerifyAccountDetails} from "../../model/request/verifyAccountDetails";
import {BaseResponse} from "../../model/response/baseResponse";
import {getHeaders} from "../../helpers/helpers";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public loginByUsername(request: AuthenticateRequest) {
    const headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    const objectObservable = this.httpClient.post<AuthenticationResponse>(environment.baseApiUrl + "/auth/login/username", request, {
      headers: headers
    });
    return firstValueFrom(objectObservable);
  }

  public loginByAccountNumber(request: AuthenticatePinRequest) {
    const headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    const objectObservable = this.httpClient.post<AuthenticationResponse>(environment.baseApiUrl + "/auth/login/accountNumber", request, {
      headers: headers
    });
    return firstValueFrom(objectObservable);
  }

  public signUp(request: SignupRequest) {
    const headers = new HttpHeaders();
    headers.set("Authorization", "Bearer " + localStorage.getItem("token"))
    const objectObservable = this.httpClient.post<AuthenticationResponse>(environment.baseApiUrl + "/auth/signup", request, {
      headers: headers
    });
    return firstValueFrom(objectObservable);
  }

  public verifyPIN(request: VerifyPinRequest) {
    const objectObservable = this.httpClient.post<BaseResponse<any>>(environment.baseApiUrl + "/auth/verify/pin", request, {
      headers: getHeaders()
    });
    return firstValueFrom(objectObservable);
  }

  public verifyAccountDetails(request: VerifyAccountDetails) {
    const objectObservable = this.httpClient.post<BaseResponse<any>>(environment.baseApiUrl + "/auth/verify/details", request, {
      headers: getHeaders()
    });
    return firstValueFrom(objectObservable);
  }

  public verifyToken() {
    const objectObservable = this.httpClient.get<BaseResponse<any>>(environment.baseApiUrl + "/auth/verify/token", {
      headers: getHeaders()
    });
    return firstValueFrom(objectObservable);
  }
}
