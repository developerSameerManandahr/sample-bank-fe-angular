import {Component, OnInit} from '@angular/core';
import {getCurrentMainModel} from "../../helpers/helpers";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public name = '';

  constructor() {
    const currentMainModel = getCurrentMainModel();
    if (currentMainModel.userDetails) {
      this.name = currentMainModel.userDetails.firstName + ' ' +
        currentMainModel.userDetails.middleName +
        '' + currentMainModel.userDetails.lastName;
    }
  }

  ngOnInit(): void {
  }

}
