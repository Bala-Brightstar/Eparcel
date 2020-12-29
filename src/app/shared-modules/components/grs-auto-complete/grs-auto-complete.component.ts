import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-grs-auto-complete',
  templateUrl: './grs-auto-complete.component.html',
  styleUrls: ['./grs-auto-complete.component.scss']
})
export class GrsAutoCompleteComponent implements OnInit, OnChanges {

  @Input()
  inputLabel = '';

  @Input()
  customFormGroup: FormGroup;

  @Input()
  formCtrlName: FormControl;

  @Input()
  handsetAttributeValue = [];

  @Output()
  selectedValue = new EventEmitter<{}>();

  filteredOptions: Observable<string[]>;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.filteredOptions = this.formCtrlName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  ngOnInit() {
    this.filteredOptions = this.formCtrlName.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(filteredValue: string): string[] {
    const filterValue = filteredValue.toLowerCase();
    return this.handsetAttributeValue.filter(option => {
      if (option.value.toLowerCase().includes(filterValue)) {
        return option.value.toLowerCase().includes(filterValue);
      }
    });
  }

  handleSelectionChangeEvent(selectedEvent) {
    this.selectedValue['event'] = selectedEvent;
    this.selectedValue['label'] = this.inputLabel;
    this.selectedValue.emit(this.selectedValue);
  }

}
