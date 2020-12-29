import { Component, OnInit } from '@angular/core';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomFormValidators } from 'src/app/util/helpers/validations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [CustomFormValidators]
})
export class DashboardComponent implements OnInit {

  inputType = 'text';
  inputLabel = 'Enter trackingID';
  inputNumberOfBox = 'Enter number of boxes';

  dekitTrackingForm: FormGroup;
  boxForm: FormGroup;

  constructor(private auth: AuthStateService, private builder: FormBuilder, private formValidator: CustomFormValidators) {
    this.dekitTrackingForm = this.builder.group({
      trackingID: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)])
    });
    this.boxForm = this.builder.group({
      boxNumber: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

  }

  getTrackingInfo() {
    console.log(this.dekitTrackingForm);
    const createFormArray: FormArray = new FormArray([this.dekitTrackingForm]);
    if (!this.formValidator.validateForm(createFormArray)) {
      console.log('Dont submit');
    } else {
      console.log('submit');
    }
  }

  getBoxNumber() {
    console.log(this.boxForm);
    const createFormArray: FormArray = new FormArray([this.boxForm]);
    if (!this.formValidator.validateForm(createFormArray)) {
      console.log('Dont submit');
    } else {
      console.log('submit');
    }
  }

}
