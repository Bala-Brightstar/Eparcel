import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-grs-textarea',
  templateUrl: './grs-textarea.component.html',
  styleUrls: ['./grs-textarea.component.scss']
})
export class GrsTextareaComponent implements OnInit, OnChanges {

  @Input() commentFormGroup;

  @Input() inputType;

  @Input() textArea;

  formCtrlComment: string;

  constructor(private builder: FormBuilder) {

  }
  ngOnChanges(changes: SimpleChanges): void {

    this.formCtrlComment = Object.keys(this.commentFormGroup.value)['comments'];
    // this.formCtrlComment = Object.keys(this.commentFormGroup.value)[0];
    console.log(this.formCtrlComment);
  }

  ngOnInit() {

  }
}
