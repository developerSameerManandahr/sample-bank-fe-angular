import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {TransferComponent} from "./components/transfer/transfer.component";
import {TransactionComponent} from "./components/transaction/transaction.component";
import {UpdatePinComponent} from "./components/update-pin/update-pin.component";
import {UpdatePasswordComponent} from "./components/update-password/update-password.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard/:id', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'transfer', component: TransferComponent},
  {path: 'transaction', component: TransactionComponent},
  {path: 'change-pin', component: UpdatePinComponent},
  {path: 'change-password', component: UpdatePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
