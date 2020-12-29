import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grs-admin',
  templateUrl: './grs-admin.component.html',
  styleUrls: ['./grs-admin.component.scss']
})
export class GrsAdminComponent implements OnInit {
  searchValueFromEvent: string;
  constructor() { }

  ngOnInit() {

  }
  wareHouse(event: any) {
    localStorage.removeItem(this.searchValueFromEvent);
    console.log(event.target.value);
    this.searchValueFromEvent = event.target.value;
    localStorage.setItem('value', this.searchValueFromEvent  );
  }
}
