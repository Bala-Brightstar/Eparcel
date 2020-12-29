import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-grs-input-old',
  templateUrl: './grs-input-old.component.html',
  styleUrls: ['./grs-input-old.component.scss']
})
export class GrsInputOldComponent implements OnInit {

  
  @Input() customFormGroup: FormGroup;

  @Input() inputType;

  @Input() textBoxlabel;

  formCtrlName: string;

  constructor(private builder: FormBuilder) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formCtrlName = Object.keys(this.customFormGroup.value)[0];
  }

  ngOnInit() {

  }
}

