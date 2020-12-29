import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-grs-dropdown-old',
  templateUrl: './grs-dropdown-old.component.html',
  styleUrls: ['./grs-dropdown-old.component.scss']
})
export class GrsDropdownOldComponent implements OnInit {

  @Input() channelDropdown;

  @Input() dropdownLabel;

  @Output()
  selectDropdownValue = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  handleDropdownChange( event ) {
    this.selectDropdownValue.emit(event);
  }

}



