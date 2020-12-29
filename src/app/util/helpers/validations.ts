import { FormGroup, FormArray, FormControl } from '@angular/forms';

export class CustomFormValidators {

    validateForm(formArray: FormArray) {
        for (const formGroup of formArray.controls) {
            if (formGroup.pristine && formGroup.status) {
                return false;
            }
            if (formGroup.invalid) {
                return false;
            } else {
                return true;
            }
        }
    }
    validateFormControl(control: FormControl) {
        console.log(control.value)
        console.log(control.status);
        console.log(control.invalid);
        if(control.status === 'VALID' && control.valid === true) {
            return true;
        } else {
            return false;
        }
    }
}
