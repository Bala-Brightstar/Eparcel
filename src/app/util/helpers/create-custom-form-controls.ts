import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Injectable } from '@angular/core';


export class CreateDynamicFormControl {

    constructor() {

    }

    controlName = 'customControl';

    async createFormControl(formGroup: FormGroup, controlUnits: []) {
        for (let i = 0; i < controlUnits.length; i++) {
            formGroup.addControl(this.controlName + i, new FormControl());
        }
        return formGroup;
    }

    async createFormArrayControls(unitTypeForm, formArrayName, unitItems, unitList) {
        unitItems = unitTypeForm.get(formArrayName) as FormArray;
        for ( let i = 0; i < unitList; i++) {
          unitItems.push(new FormControl(''));
      }
        return unitTypeForm;
    }



}