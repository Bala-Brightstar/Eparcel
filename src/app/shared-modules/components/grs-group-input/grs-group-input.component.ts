import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-grs-group-input',
  templateUrl: './grs-group-input.component.html',
  styleUrls: ['./grs-group-input.component.scss']
})
export class GrsGroupInputComponent implements OnInit {

  customClass = 'unit-wrapper';

  /* MinLenth and MaxLength default values can be overriden based on configuration */
  @Input()
  fieldMinLength = 1;

  @Input()
  fieldMaxLength = 40;

  @Input()
  customFormGroup: FormGroup;

  formHeader: FormArray;
  formHeaderArrayValues: FormArray;

  indexer = 0;
  populateBasedOnSpecificIndex = false;

  @Input()
  customFormControl;


  @Output()
  emitData = new EventEmitter<{}>();

  customPlaceHolder: string;

  customFormArray: FormArray;

  customClassName: string;

  customLabel: [];

  isKeyPressEvent = false;

  /* Use only if customlabel is not present! */
  commonLabel: string;

  constructor() { }

  ngOnInit() {
    this.customFormArray = this.customFormGroup.get(this.customFormControl) as FormArray;
  }

  /* unit white space & max validator - Start */
  _keyPressunits(event: any) {
    const pattern = /[1-4]/;
    const inputChar = String.fromCharCode(event.charCode);
    console.log('before', inputChar);
    if (!pattern.test(inputChar)) {
      console.log('if', inputChar);
      event.preventDefault();
    }
  }
  _keyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  submitDeviceIDValues(fieldIndex, value) {
    if (this.isKeyPressEvent) {
      this.emitData['fieldIndex'] = fieldIndex;
      this.emitData['fieldValue'] = value;
      this.emitData.emit(this.emitData);
    }
  }

}
