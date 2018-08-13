import { Component } from '@angular/core';
import { ApoloComponent } from './../../@core/data/apolo.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private assetsService: ApoloComponent){

  }
}
