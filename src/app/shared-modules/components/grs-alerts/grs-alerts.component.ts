import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert-service/alert-service';

@Component({
  selector: 'app-grs-alerts',
  templateUrl: './grs-alerts.component.html',
  styleUrls: ['./grs-alerts.component.scss']
})
export class GrsAlertsComponent implements OnInit {

  constructor(private alertService: AlertService) { }

  ngOnInit() {
  }

  closeMessage() {
    this.alertService.isShowMessage(false);
    this.alertService.message(null);
  }

}
