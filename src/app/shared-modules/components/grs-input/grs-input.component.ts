import { Component, Renderer2, EventEmitter, OnInit, OnChanges, Input, SimpleChanges, forwardRef, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grs-input',
  templateUrl: './grs-input.component.html',
  styleUrls: ['./grs-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrsInputComponent),
      multi: true
    }
  ]
})
export class GrsInputComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() customFormGroup: FormGroup;

  @Input() inputType;

  @Input() myProperty;

  @Input() label;

  @Input() channeleWarning;

  isError: boolean;
  errorValue;
  textBoxlabel: string;

  @Output() emitValue = new EventEmitter();

  customValue = '';

  customPlaceHolder;

  textValue: Promise<any>;

  @Input()
  formCtrlName: FormControl;

  dynamicRenderer: Renderer2;

  @Input() testFormControl: FormControl;


  constructor(public renderer: Renderer2) {

  }
  ngAfterViewInit(): void {
  }

  onTouchedCallback = () => { };
  onChangeCallback: any = () => { };


  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {

  }



  submit(value) {
    this.emitValue.emit(value);
  }
  onChange(event: any): void {
    this.onChangeCallback(event.target.value);
  }

}
