import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {NavComponent} from './components/nav/nav.component';
import {MainComponent} from './components/main/main.component';
import {AsideComponent} from './components/aside/aside.component';
import {FooterComponent} from './components/footer/footer.component';
import {PrivacyPolicyComponent} from './components/privacy-policy/privacy-policy.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {SignupComponent} from './components/signup/signup.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MoveMoneyComponent} from './components/move-money/move-money.component';
import {SendMoneyComponent} from './components/send-money/send-money.component';
import {TransactionComponent} from './components/transaction/transaction.component';
import {TransferComponent} from './components/transfer/transfer.component';
import {NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    MainComponent,
    AsideComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    MoveMoneyComponent,
    SendMoneyComponent,
    TransactionComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
