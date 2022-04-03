import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PrivacyPolicyComponent} from "./components/privacy-policy/privacy-policy.component";
import {MainComponent} from "./components/main/main.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {TransferComponent} from "./components/transfer/transfer.component";
import {TransactionComponent} from "./components/transaction/transaction.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
