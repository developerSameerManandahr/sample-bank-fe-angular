import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom, Observable} from "rxjs";
import {Exchange} from "../model/exchange";
import {Constant} from "../helpers/constant";

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  convert(
    outputCurrencyType: string,
    amount: number): Promise<number> {

    const objectObservable = this.httpClient.get<Exchange>(environment.exchangeApiUrl, {
      params: {
        base: Constant.BASE_CURRENCY,
        symbols: outputCurrencyType
      }
    });

    return this.convertToPromise(objectObservable, outputCurrencyType, amount)
  }

  convertFrom(
    outputCurrencyType: string,
    amount: number,
    input: string = 'GBP'
  ): Promise<number> {

    const objectObservable = this.httpClient.get<Exchange>(environment.exchangeApiUrl, {
      params: {
        base: input,
        symbols: outputCurrencyType
      }
    });

    return this.convertToPromise(objectObservable, outputCurrencyType, amount)
  }

  private convertToPromise(objectObservable: Observable<Exchange>, outputCurrencyType: string, amount: number) {
    return firstValueFrom(objectObservable)
      .then((exchange: Exchange) => {
        return exchange.rates[outputCurrencyType] * amount
      });
  }
}
