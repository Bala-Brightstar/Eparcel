import { Injectable } from "@angular/core";

export interface Locations {
    locationId: number;
    value: string;
}

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    locations: Locations[] = [
        {
            locationId: 1,
            value: 'Dallas'
        }, {
            locationId: 2,
            value: 'Woodbridge'
        }
    ];

    constructor() {
    }

    setdefaultLocation() {
        if(!window.localStorage.getItem('warehouseLocation')) {
            window.localStorage.setItem('warehouseLocation', this.locations[0].locationId.toString());
        }
    }

    setLocation(selectedLocation: Locations) {
        if(selectedLocation) {
            window.localStorage.setItem('warehouseLocation', selectedLocation.locationId.toString());
        }
    }

    get getLocation() {
        return this.locations.filter(location => location.locationId === parseInt(window.localStorage.getItem('warehouseLocation')))[0];
    }

    get getLocations() {
        return this.locations;
    }

    get getLocationId() {
        return parseInt(window.localStorage.getItem('warehouseLocation'));
      }
}