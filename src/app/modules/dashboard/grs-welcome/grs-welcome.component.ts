import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location-service/location-service';

@Component({
  selector: 'app-grs-welcome',
  templateUrl: './grs-welcome.component.html',
  styleUrls: ['./grs-welcome.component.scss']
})
export class GrsWelcomeComponent implements OnInit {

  constructor(private locationService: LocationService, private _route: Router) {

  }

  ngOnInit() {
    /* Temporary changes to set location upon login */
    this.locationService.setdefaultLocation();
  }

  onTelstraRoute(){
    this._route.navigate(['/dashboard/dashboardTable']);
  }

}
