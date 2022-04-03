import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MainModel} from "./model/mainModel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'worksheet-with-design';

  public currency = 'GBP';

  constructor(private router: Router) {
    if (localStorage.getItem('currency')) {

    }
    let currentUser = localStorage.getItem('CurrentUser');
    if (currentUser) {
      this.router.navigate(['/dashboard']);
    } else if (!currentUser) {
      this.router.navigate(['/login']);
    }
  }

  click() {
    return this.router.navigate(['/dashboard'])
  }

  ngOnInit(): void {
    if (localStorage.getItem('admin')) {
      console.warn('Already initialized');
    } else {

      const model: MainModel = {
        userDetails: {
          pin: '123456',
          password: 'admin1234',
          firstName: 'Admin',
          lastName: 'Admin',
          middleName: '',
          username: 'admin',
          accountNumber: "1234567890"
        },
        balance: {
          CURRENT: 100000,
          SAVING: 100000
        },
        currency: 'GBP',
      };
      localStorage.setItem('admin', JSON.stringify(model));

      localStorage.setItem('currency', 'GBP');
    }
    let currentUser = localStorage.getItem('CurrentUser');
    if (currentUser) {
      this.router.navigate(['/dashboard']);
    } else if (!currentUser) {
      this.router.navigate(['/login']);
    }
  }
}
