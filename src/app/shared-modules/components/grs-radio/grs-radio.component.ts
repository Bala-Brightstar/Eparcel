import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatRadioButton } from '@angular/material';



@Component({
  selector: 'app-grs-radio',
  templateUrl: './grs-radio.component.html',
  styleUrls: ['./grs-radio.component.scss']
})
export class GrsRadioComponent implements OnInit, OnChanges {


  @Input() radioCustomValue;

  displayValue;

  @Input() radioLabel;

  @Output()
  selectRadioValue = new EventEmitter<{}>();

  @Input()
  defaultSelectedValue = false;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
  }


  handleRadioEvent(event, val: MatRadioButton) {
    event.preventDefault();
    if(this.displayValue && this.displayValue === val.value) {
      val.checked = false;
      this.displayValue = null;
    } else {
      val.checked = true;
      this.displayValue = val.value;
    }
    this.selectRadioValue['event'] = this.displayValue;
    this.selectRadioValue['label'] = this.radioLabel;
    this.selectRadioValue['checked'] = val.checked;
    this.selectRadioValue.emit(this.selectRadioValue);
  }



}
