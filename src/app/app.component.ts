import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

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
    this.router.events
      .subscribe(value => {
        console.log();
      })
    let currentUser = localStorage.getItem('currentUser');
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

      localStorage.setItem('currency', 'GBP');
    }
  }
}
