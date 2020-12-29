import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-grs-checkbox',
  templateUrl: './grs-checkbox.component.html',
  styleUrls: ['./grs-checkbox.component.scss']
})
export class GrsCheckboxComponent implements OnInit {

  @Input()
  boxValues;

  selectedValues = [];

  @Input()
  textBoxlabel;

  @Input()
  isDeFaultCheckNeeded = false;

  @Output()
  emitSelectedValues = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  checkValue(event: any) {
    if (this.selectedValues.indexOf(event.source.value) === -1) {
      this.selectedValues.push(event.source.value);
    } else {
      const index = this.selectedValues.indexOf(event.source.value);
      this.selectedValues.splice(index, 1);
    }
    this.emitSelectedValues.emit(this.selectedValues);
 }

}
