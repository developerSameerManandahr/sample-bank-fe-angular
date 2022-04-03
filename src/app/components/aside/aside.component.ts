import {Component, OnInit} from '@angular/core';
import {getCurrentMainModel, getUser} from "../../helpers/helpers";
import {Router} from "@angular/router";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  public currentBalance: number = 0;
  public savingBalance: number = 0;
  public user: string = '';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    let user1 = getUser();
    if (user1)
      this.user = user1;
    let balance1 = getCurrentMainModel().balance;
    if (balance1) {
      this.currentBalance = balance1['CURRENT'];
      this.savingBalance = balance1['SAVING'];
    }
  }

  logout(): Promise<boolean> {
    localStorage.removeItem('currentUser');
    return this.router.navigate(['/login']);
  }

}
