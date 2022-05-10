import {Component, OnInit} from '@angular/core';
import {getStringItem} from "../../helpers/helpers";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public name = '';

  constructor() {
    let middleName = getStringItem('middleName').length == 0 ? '' : getStringItem('middleName') + ' ';
    this.name = getStringItem('firstName') + ' ' + middleName + getStringItem('lastName');
  }

  ngOnInit(): void {
  }

}
