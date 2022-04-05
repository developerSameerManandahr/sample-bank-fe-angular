import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public isTransactionClicked = false;
  public isHomeClicked = true;
  public isTransferClicked = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    // Used to see while page is clicked
    this.route.params.subscribe(value => {
      switch (value['id']) {
        case '1':
          this.isHomeClicked = false;
          this.isTransactionClicked = true;
          this.isTransferClicked = false;
          break;
        case '2':
          this.isHomeClicked = false;
          this.isTransactionClicked = false;
          this.isTransferClicked = true;
          break;
        default:
        case '0':
          this.isHomeClicked = true;
          this.isTransactionClicked = false;
          this.isTransferClicked = false;
          break;
      }
    });
  }

}
