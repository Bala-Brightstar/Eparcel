import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-grs-radio-old',
  templateUrl: './grs-radio-old.component.html',
  styleUrls: ['./grs-radio-old.component.scss']
})
export class GrsRadioOldComponent implements OnInit {


  @Input() radioCustomValue;

  @Output()
  selectRadioValue = new EventEmitter();

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
  }

  handleRadioEvent(event) {
    console.log(event)
    this.selectRadioValue.emit(event);
  }



}
