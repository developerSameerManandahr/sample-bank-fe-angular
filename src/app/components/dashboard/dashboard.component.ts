import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../servies/api/AuthService";
import {isSuccessFull} from "../../helpers/helpers";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [AuthService]
})
export class DashboardComponent implements OnInit {

  public isTransactionClicked = false;
  public isHomeClicked = true;
  public isTransferClicked = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
  }

  async ngOnInit() {

    try {
      const verifyToken = await this.authService.verifyToken();

      if (!isSuccessFull(verifyToken)) {
        await this.logout();
      }

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
    } catch (exception) {
      await this.logout();
    }
  }

  logout(): Promise<boolean> {
    localStorage.removeItem('currentUser');
    return this.router.navigate(['/login']);
  }

}
