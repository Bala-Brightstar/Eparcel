import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-grs-dropdown',
  templateUrl: './grs-dropdown.component.html',
  styleUrls: ['./grs-dropdown.component.scss']
})
export class GrsDropdownComponent implements OnInit {
  @Input() isDisplayHeader = true;
  @Input() channelDropdown;

  @Input() dropdownLabel;

  @Input() isDefaultValue = false;

  selected;

  listValues = [{
    'locationAttributeValueId': -1,
    'value': '---- SELECT ----'
  }];

  @Output()
  dropDownValue = new EventEmitter<{}>();

  constructor() { }

  ngOnInit() {
    if (this.isDefaultValue) {
      for (const val of this.channelDropdown) {
        this.listValues.push(val);
      }
      this.selected = this.listValues[0];
    } else {
      this.listValues = this.channelDropdown;
    }
  }

  handleDropdownChange( event ) {
    this.dropDownValue['event'] = event;
    this.dropDownValue['label'] = this.dropdownLabel;
    this.dropDownValue.emit(this.dropDownValue);
    console.log(event);
  }

}
