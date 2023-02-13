import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AnalyticsServiceService } from './analytics-service.service';

declare const gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public router: Router, private analyticsServiceService: AnalyticsServiceService) {
    this.analyticsServiceService.init();
  }
}
