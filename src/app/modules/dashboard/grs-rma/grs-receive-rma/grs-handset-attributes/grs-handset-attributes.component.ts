import {
  Component, ViewChild, Input, OnChanges, OnInit, Output,
  EventEmitter, SimpleChanges, ComponentRef, OnDestroy
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  DeviceColor, GetAllManufacturers, GetManuFacturer,
  MemorySize, Model
} from 'src/app/services/rest-services/rma-service/rma-handset-service';
import { API } from 'aws-amplify';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';
import { CreateReferenceNumber } from 'src/app/util/helpers/create-reference';

@Component({
  selector: 'app-grs-handset-attributes',
  templateUrl: './grs-handset-attributes.component.html',
  styleUrls: ['./grs-handset-attributes.component.scss'],
  providers: [CreateReferenceNumber]
})
export class GrsHandsetAttributesComponent implements OnInit {

  manufacturerDescriptionValue = new FormControl();
  modelDescriptionValue = new FormControl('', Validators.required);
  sizeDescriptionValue = new FormControl('', Validators.required);
  colorDescriptionValue = new FormControl('', Validators.required);
  carrierDescriptionValue = new FormControl('', Validators.required);
  partDescriptionValue = new FormControl('', Validators.required);

  isShowModelAttributes = true;

  handsetUpdate = 'handsetUpdate';
  handsetCancel = 'handsetCancel';
  showErrorMessage = false;
  formErrorMessage = '';
  serialError = 'Invalid TAC';

  @Input()
  receiveInputForm: FormGroup;

  @Input()
  getManufacturerDetails: GetManuFacturer;

  @Input()
  getAllManufacturers: GetAllManufacturers[];

  @Input()
  openhandset = false;

  @Input()
  isSerialInvalid = false;

  @Output()
  changeEmitter = new EventEmitter();

  @Output()
  updateEmitter = new EventEmitter<FormGroup>();

  @Input()
  destroyHandset: ComponentRef<GrsHandsetAttributesComponent>;

  @ViewChild('drawer', { static: false }) drawer: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  manufacturerLabel = 'Manufacturer';
  manufacturerValue = [];

  carrierLabel = 'Carrier';
  carrierValue = [];

  modelLabel = 'Model';
  modelValue = [];

  sizeLabel = 'Size';
  sizeValue = [];

  colorLabel = 'Color';
  colorValue = [];

  partNumberLabel = 'Part Number';
  partNumberValue = '';

  filteredOptions: Observable<string[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthStateService,
    private refNo: CreateReferenceNumber,
    private snackBar: MatSnackBar) {
  }

  checkForInvalidSerial() {
    if (this.isSerialInvalid) {
      this.showErrorMessage = true;
      this.formErrorMessage = 'Invalid Serial Format';
    } else {
      this.showErrorMessage = false;
    }
  }

  async ngOnInit() {
    this.checkForInvalidSerial();
    this.manufacturerDescriptionValue.setValue(this.receiveInputForm.get('manufacturer').value['manufacturerDescription']);
    this.manufacturerValue.push({
      value: this.receiveInputForm.get('manufacturer').value['manufacturerDescription']
    });
    this.modelDescriptionValue.setValue(this.receiveInputForm.get('model').value['modelDescription']);
    this.modelValue.push({
      value: this.receiveInputForm.get('model').value['modelDescription']
    });
     if(this.receiveInputForm.get('memorySize').value !== null) {
      this.sizeDescriptionValue.setValue(this.receiveInputForm.get('memorySize').value['memorySizeDescription']);
      this.sizeValue.push({
        value: this.receiveInputForm.get('memorySize').value['memorySizeDescription']
      });
     } else {
       /* Quick fix for showing dropdown values for Invalid TAC scenario. Need to find better way */
       await this.assignManufacturerModelOnHandsetOpen();
     }
     if(this.receiveInputForm.get('color').value !== null) {
      this.colorDescriptionValue.setValue(this.receiveInputForm.get('color').value['colorDescription']);
      this.colorValue.push({
        value: this.receiveInputForm.get('color').value['colorDescription']
      });
     }
     if(this.receiveInputForm.get('carrier').value !== null) {
      this.carrierDescriptionValue.setValue(this.receiveInputForm.get('carrier').value['carrierDescription']);
      this.carrierValue.push({
        value: this.receiveInputForm.get('carrier').value['carrierDescription']
      });
      this.partDescriptionValue.setValue(this.receiveInputForm.get('partNumber').value);
     }
    await this.assignManufacturers();
    await this.assignManufacturerModelOnHandsetOpen();
  }

  /* Logic to push all manfacturers to display list of manufacturers in dropdown*/
  async assignManufacturers() {
    if (this.getAllManufacturers) {
      for (const manufacturer of this.getAllManufacturers) {
        const findManufacturer = this.manufacturerValue.find(d => d.value === manufacturer.manufacturerDescription);
        if (!findManufacturer) {
          this.manufacturerValue.push({
            value: manufacturer.manufacturerDescription
          });
        }
      }
    }
  }

  async assignManufacturerModelOnHandsetOpen() {
    const value = 'value';
    if (this.getManufacturerDetails) {
      for (const model of this.getManufacturerDetails.models) {
        if (model.modelDescription === this.receiveInputForm.get('model').value['modelDescription']) {
          const pred = this.modelValue.find(d => d.value === model.modelDescription);
          if (!pred) {
            this.modelValue.push({
              value: model.modelDescription
            });
          }
          for (const size of model.memorySizes) {
            const sizeFinder = this.sizeValue.find(d => d.value === size.memorySizeDescription);
            if (!sizeFinder) {
              this.sizeValue.push({
                value: size.memorySizeDescription
              });
            }
            for (const color of size.colors) {
              if (size.memorySizeDescription === this.receiveInputForm.get('memorySize').value) {
                const colorFinder = this.colorValue.find(d => d.value === color.colorDescription);
                if (!colorFinder) {
                  this.colorValue.push({
                    value: color.colorDescription
                  });
                }

                for (const carrier of color.carriers) {
                  if (color.colorDescription === this.receiveInputForm.get('color').value) {
                    const carrierFinder = this.carrierValue.find(d => d.value === carrier.carrierDescription);
                    if (!carrierFinder) {
                      this.carrierValue.push({
                        value: carrier.carrierDescription
                      });
                    }
                    /* Need logic to display part-numbers here!*/
                  }
                }
              }
            }
          }
        } else {
          this.modelValue.push({
            value: model.modelDescription
          });
        }
      }
    }
  }

  get getModelFromForm() {
    return this.receiveInputForm.get('model');
  }

  closeHandSet() {
    if (this.drawer.opened) {
      this.openhandset = false;
      this.drawer.close();
      this.destroyHandset.hostView.destroy();
    }
  }

  toggleHandset() {
    if (!this.drawer.opened) {
      this.openhandset = true;
      this.drawer.open();
    } else {
      this.openhandset = false;
      this.drawer.close();
      this.destroyHandset.hostView.destroy();
    }
  }

  /* Avoid sending the form data directly although that can directly change the parent screen value,
     as, during cancel or closing screen, update value will not be reverted back to original state */
  async updateHandsetAttributes() {
    const result = await this.setFormValuesToEmit();
    if (result) {
      this.updateEmitter.emit(result);
      this.toggleHandset();
    }
  }

  async setFormValuesToEmit() {
    if (await this.validateFormValues()) {
      let updateFormgroup: FormGroup;
      const getManufacturerDetail = this.getAllManufacturers
        .filter(manufacturer => manufacturer.manufacturerDescription === this.manufacturerDescriptionValue.value);
      const getModelDetail = this.getManufacturerDetails.models
        .filter(model => model.modelDescription === this.modelDescriptionValue.value);
      const getSizeDetail = getModelDetail[0].memorySizes
        .filter(size => size.memorySizeDescription === this.sizeDescriptionValue.value);
      const colorDetail = getSizeDetail[0].colors
        .filter(color => color.colorDescription === this.colorDescriptionValue.value);
      const carrierDetail = colorDetail[0].carriers
        .filter(carrier => carrier.carrierDescription === this.carrierDescriptionValue.value);
      updateFormgroup = new FormGroup({
        manufacturerDescriptionValue: new FormControl(getManufacturerDetail[0]),
        modelDescriptionValue: new FormControl(getModelDetail[0]),
        sizeDescriptionValue: new FormControl(getSizeDetail[0]),
        colorDescriptionValue: new FormControl(colorDetail[0]),
        carrierDescriptionValue: new FormControl(carrierDetail[0]),
      });
      return updateFormgroup as FormGroup;
    }
    return false;
  }

  async validateFormValues() {
    if (this.modelDescriptionValue.invalid || this.manufacturerDescriptionValue.invalid ||
      this.sizeDescriptionValue.invalid || this.colorDescriptionValue.invalid || this.carrierDescriptionValue.invalid) {
      this.showErrorMessage = true;
      this.formErrorMessage = 'Please fill missing fields';
      return;
    }
    return true;
  }

  async observeChange(observedEvent) {
    const value = 'value';
    if (observedEvent.label === 'Model') {
      this.modelDescriptionValue.setValue(observedEvent['event']['value'].value);
      await this.changeModelBasedOnSelection(observedEvent.label, observedEvent['event']['value'].value, true);
    }
    if (observedEvent.label === 'Size') {
      this.sizeDescriptionValue.setValue(observedEvent['event']['value'].value);
      await this.changeSizeBasedOnSelection(observedEvent.label, observedEvent['event']['value'].value, true);
    }
    if (observedEvent.label === 'Color') {
      this.colorDescriptionValue.setValue(observedEvent['event']['value'].value);
      await this.changeColorBasedOnSelection(observedEvent.label, observedEvent['event']['value'].value, true);
    }
    if (observedEvent.label === 'Carrier') {
      this.carrierDescriptionValue.setValue(observedEvent['event']['value'].value);
      await this.changeCarrierBasedOnSelection(observedEvent.label, observedEvent['event']['value'].value, true);
    }
  }

  async handleSelectionChangeEvent(selectionEvent) {
    if (selectionEvent.label === 'Manufacturer') {
      this.getAllManufacturers.filter(async manufacturer => {
        if (manufacturer.manufacturerDescription === selectionEvent['event']['option'].value) {
          this.isShowModelAttributes = false;
          await this.changeManufacturerBasedOnSelection(manufacturer);
          this.isShowModelAttributes = true;
        }
      })

    } else if (selectionEvent.label === 'Model') {
      this.sizeDescriptionValue = new FormControl('', Validators.required);
      this.colorDescriptionValue = new FormControl('', Validators.required);
      this.carrierDescriptionValue = new FormControl('', Validators.required);
      this.partDescriptionValue = new FormControl('', Validators.required);
      this.modelDescriptionValue.setValue(selectionEvent['event']['option'].value);
      await this.changeModelBasedOnSelection(selectionEvent.label, selectionEvent['event']['option'].value, true);
    } else if (selectionEvent.label === 'Size') {
      this.colorDescriptionValue = new FormControl('', Validators.required);
      this.carrierDescriptionValue = new FormControl('', Validators.required);
      this.partDescriptionValue = new FormControl('', Validators.required);
      this.sizeDescriptionValue.setValue(selectionEvent['event']['option'].value);
      await this.changeSizeBasedOnSelection(selectionEvent.label, selectionEvent['event']['option'].value, true);
    } else if (selectionEvent.label === 'Color') {
      this.carrierDescriptionValue = new FormControl('', Validators.required);
      this.partDescriptionValue = new FormControl('', Validators.required);
      this.colorDescriptionValue.setValue(selectionEvent['event']['option'].value);
      await this.changeColorBasedOnSelection(selectionEvent.label, selectionEvent['event']['option'].value, true);
    } else if (selectionEvent.label === 'Carrier') {
      this.carrierDescriptionValue.setValue(selectionEvent['event']['option'].value);
      await this.changeCarrierBasedOnSelection(selectionEvent.label, selectionEvent['event']['option'].value, true);
    }
  }

  async changeManufacturerBasedOnSelection(manufacturer) {
    const apiName = 'grsrest';
    const refNumber = this.refNo.generateRefernceNumber;
    const custId = this.receiveInputForm.get('customerId').value;
    const mId = manufacturer.manufacturerId;
    const mCode = manufacturer.manufacturerCode;
    const path = `/erp/part/details/${refNumber}/${custId}/${mId}/${mCode}`;
    const params = {
      headers: {
        'X-Bstar-Authorization': `Bearer ${this.auth.getJwtToken()}`
      }
    };
    const apiResult = await API.get(apiName, path, params)
      .catch(error => {
        this.snackBar.open(error, 'Close', {
          duration: 5000
        });
        this.isShowModelAttributes = true;
      });
    // This is not the right way. still go nested way and check
    if (apiResult.data) {
      this.modelDescriptionValue = new FormControl('', Validators.required);
      this.sizeDescriptionValue = new FormControl('', Validators.required);
      this.colorDescriptionValue = new FormControl('', Validators.required);
      this.carrierDescriptionValue = new FormControl('', Validators.required);
      this.partDescriptionValue = new FormControl('', Validators.required);
      this.modelValue = [];
      this.colorValue = [];
      this.sizeValue = [];
      this.carrierValue = [];
      this.partNumberValue = '';
      let modelDetails: Model[];
      modelDetails = apiResult.data['models'];
      this.getManufacturerDetails.models = [];
      for (const modelDetail of modelDetails) {
        this.getManufacturerDetails.models.push(modelDetail);
      }
      await this.assignManufacturerModelOnHandsetOpen();
    }
  }

  async changeModelBasedOnSelection(label, selectedValue, isPrimarySelection?: boolean, modelData?: Model) {
    /* If isPrimary selection is true, then user has selected size in dropdown and ignore the modeldata */
    this.colorValue = []; // This resets size dropdown upon its parent hierarchial selection!
    this.sizeValue = [];
    this.carrierValue = [];
    this.partNumberValue = '';
    if (isPrimarySelection) {
      for (const model of this.getManufacturerDetails.models) {
        if (model.modelDescription === selectedValue) {
          await this.changeSizeBasedOnSelection(label, selectedValue, false, model);
        }
      }
    } else {
      if (this.getManufacturerDetails) {
        for (const model of this.getManufacturerDetails.models) {
          if (model.modelDescription === selectedValue) {
            const modelFinder = this.modelValue.find(d => d.value === model.modelDescription);
            if (!modelFinder) {
              this.modelValue.push({
                value: model.modelDescription
              });
            }
            await this.changeSizeBasedOnSelection(label, selectedValue, false, model);
          } else {
            this.modelValue.push({
              value: model.modelDescription
            });
          }
        }
      }
    }
  }

  async changeSizeBasedOnSelection(label, selectedValue, isPrimarySelection?: boolean, modelData?: Model) {
    this.colorValue = []; // This resets size dropdown upon its parent hierarchial selection!
    this.carrierValue = [];
    this.partNumberValue = '';
    /* If isPrimary selection is true, then user has selected size in dropdown and ignore the modeldata */
    if (!isPrimarySelection) {
      if (this.sizeValue.length > 0) {
        this.sizeValue = []; // This resets size dropdown upon its parent hierarchial selection!
      }

      for (const size of modelData.memorySizes) {
        const sizeFinder = this.sizeValue.find(d => d.value === size.memorySizeDescription);
        if (!sizeFinder) {
          this.sizeValue.push({
            value: size.memorySizeDescription
          });
        }

      }
    } else {
      // await this.changeColorBasedOnSelection(label, selectedValue, false, size);
      /* Do primary selection logic here.. */
      for (const model of this.getManufacturerDetails.models) {
        if (model.modelDescription === this.modelDescriptionValue.value) {
          for (const size of model.memorySizes) {
            if (size.memorySizeDescription === selectedValue) {
              await this.changeColorBasedOnSelection(label, selectedValue, false, size);
            }
          }
        }
      }
    }
  }

  async changeColorBasedOnSelection(label, selectedValue, isPrimarySelection?: boolean, memoryData?: MemorySize) {
    // This resets size dropdown upon its parent hierarchial selection!
    this.carrierValue = [];
    this.partNumberValue = '';
    /* If isPrimary selection is true, then user has selected size in dropdown and ignore the modeldata */
    if (!isPrimarySelection) {
      for (const color of memoryData.colors) {
        const sizeFinder = this.colorValue.find(d => d.value === color.colorDescription);
        if (!sizeFinder) {
          this.colorValue.push({
            value: color.colorDescription
          });
        }
      }
    } else {
      /* Do primary selection logic here.. */
      for (const model of this.getManufacturerDetails.models) {
        /* check from here, there can be multiple values with same color, size, so array values
        get popped up wrongly, so do check on size, model, color or hierarchial also */
        if (this.modelDescriptionValue.value === model.modelDescription) {
          for (const size of model.memorySizes) {
            if (size.memorySizeDescription === this.sizeDescriptionValue.value) {
              for (const color of size.colors) {
                if (color.colorDescription === selectedValue) {
                  await this.changeCarrierBasedOnSelection(label, selectedValue, false, color);
                }
              }
            }
          }
        }
      }
    }
  }

  async changeCarrierBasedOnSelection(label, selectedValue, isPrimarySelection?: boolean, memoryData?: DeviceColor) {
    this.partNumberValue = '';
    if (isPrimarySelection) {
      for (const model of this.getManufacturerDetails.models) {
        if (model.modelDescription === this.modelDescriptionValue.value) {
          for (const size of model.memorySizes) {
            if (size.memorySizeDescription === this.sizeDescriptionValue.value) {
              for (const color of size.colors) {
                if (color.colorDescription === this.colorDescriptionValue.value) {
                  for (const carrier of color.carriers) {
                    if (carrier.carrierDescription === selectedValue) {
                      // await this.changeColorBasedOnSelection(label, selectedValue, false, null);
                      this.partDescriptionValue.setValue(carrier.partNumber);
                    }
                  }
                }
              }
            }
          }
        }
      }
    } else {
      for (const carrier of memoryData.carriers) {
        const carrierFinder = this.carrierValue.find(d => d.value === carrier.carrierDescription);
        if (!carrierFinder) {
          this.carrierValue.push({
            value: carrier.carrierDescription
          });
        }
      }
    }
  }
}
