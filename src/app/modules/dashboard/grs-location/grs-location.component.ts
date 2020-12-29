import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AlertService, BootstrapAlerts } from 'src/app/services/alert-service/alert-service';
import { Locations, LocationService } from 'src/app/services/location-service/location-service';

@Component({
  selector: 'app-grs-location',
  templateUrl: './grs-location.component.html',
  styleUrls: ['./grs-location.component.scss']
})
export class GrsLocationComponent implements OnInit {

  label = 'Select location';

  locationNote = 'Default Location upon Login: Dallas. Current Location: ' + window.localStorage.getItem('warehouseLocation');

  buttonColor = '#363054';

  selectedLocation: Locations;

  holdLocationValue: Locations;

  constructor(private snackbar: MatSnackBar, 
              private locationService: LocationService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.selectedLocation = this.locationService.getLocation;
  }

  setLocation(locationEmitter) {
    this.holdLocationValue = locationEmitter.event.value;
  }
  selectLocation() {
    if(this.holdLocationValue) {
     this.locationService.setLocation(this.holdLocationValue);
     this.selectedLocation = this.holdLocationValue;
     this.alertService.showMessageToUser(`Location updated to ${this.selectedLocation.value}`, BootstrapAlerts.SUCCESS, true, false);
    }
  }

  get getListOfLocations() {
    return this.locationService.getLocations;
  }

}
