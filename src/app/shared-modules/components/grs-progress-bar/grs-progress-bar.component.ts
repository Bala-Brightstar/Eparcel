import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule, ThemePalette } from '@angular/material';
@Component({
  selector: 'app-grs-progress-bar',
  templateUrl: './grs-progress-bar.component.html',
  styleUrls: ['./grs-progress-bar.component.scss']
})
export class GrsProgressBarComponent implements OnInit {

  color: ThemePalette = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;

  progressInformation = 'Fetching details...';

  constructor() { }

  ngOnInit() {
  }

}
