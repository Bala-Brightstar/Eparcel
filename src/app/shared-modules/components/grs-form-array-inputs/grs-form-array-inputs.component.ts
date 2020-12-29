import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-grs-form-array-inputs',
  templateUrl: './grs-form-array-inputs.component.html',
  styleUrls: ['./grs-form-array-inputs.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GrsFormArrayInputsComponent implements OnInit, OnChanges {

  @Input() customTypeForm;

  @Input() customArrayLabel;

  @Input() customPlaceHolder;

  @Input() customFormArrayName;

  @Output() indexFinder = new EventEmitter();

  formFieldsFinder: [];


  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log( this.customTypeForm, changes );
    this.formFieldsFinder = this.customTypeForm.controls[this.customFormArrayName].controls;
    console.log("formFieldsFinder: "+ this.formFieldsFinder);
  }

  ngOnInit() {
  }

  customSubmit(unit, index) {
    console.log(unit)
    this.indexFinder.emit(index);
  }

}
