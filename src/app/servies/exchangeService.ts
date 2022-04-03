import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {Exchange} from "../model/exchange";

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

    const item = localStorage.getItem('currency');
    const base: string = item ? item : 'GBP';
    const objectObservable = this.httpClient.get<Exchange>(environment.exchangeApiUrl, {
      params: {
        base: base,
        symbols: outputCurrencyType
      }
    });

    return firstValueFrom(objectObservable)
      .then((exchange: Exchange) => {
        return exchange.rates[outputCurrencyType] * amount
      })
  }
}
