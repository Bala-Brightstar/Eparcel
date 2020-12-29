
import { AfterViewInit, ComponentRef, OnDestroy } from '@angular/core';
import { Component, ComponentFactoryResolver, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';
import { attributeData, GetDekitConfigInfoQuery, item, lineItem, SaveDeKitInput } from 'src/app/services/graphql-services/dekit-service/dekit-api-service';
import { GrsCheckboxComponent } from 'src/app/shared-modules/components/grs-checkbox/grs-checkbox.component';
import { GrsDropdownComponent } from 'src/app/shared-modules/components/grs-dropdown/grs-dropdown.component';
import { GrsGroupInputComponent } from 'src/app/shared-modules/components/grs-group-input/grs-group-input.component';
import { GrsInputComponent } from 'src/app/shared-modules/components/grs-input/grs-input.component';
import { GrsProgressBarComponent } from 'src/app/shared-modules/components/grs-progress-bar/grs-progress-bar.component';
import { GrsRadioComponent } from 'src/app/shared-modules/components/grs-radio/grs-radio.component';
import { GrsInput } from 'src/app/util/GRSConstants';
import { CreateDynamicFormControl } from 'src/app/util/helpers/create-custom-form-controls';
import { CreateReferenceNumber } from 'src/app/util/helpers/create-reference';
import { CustomFormValidators } from 'src/app/util/helpers/validations';
import { NgxSpinnerService } from 'ngx-spinner';
import { DekitApiErrorService, DekitTrackingErrors } from 'src/app/util/messages/error-messages/dekit-messages';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DekitAPIService } from 'src/app/services/graphql-services/dekit-service/dekit-api-service';
import { HttpClient } from '@angular/common/http';
import { LocationService } from 'src/app/services/location-service/location-service';

@Component({
  selector: 'app-grs-dekit',
  templateUrl: './grs-dekit.component.html',
  styleUrls: ['./grs-dekit.component.scss'],
  providers: [CustomFormValidators, CreateReferenceNumber, CreateDynamicFormControl]
})
export class GrsDekitComponent implements OnInit, AfterViewInit, OnDestroy {

  dekitTrackingForm: FormGroup;

  /* Response variables */
  dekitGetConfigData: GetDekitConfigInfoQuery;
  dekitGetConfigDataAttributeLength = 0;

  componentIndex = 0;

  private cIndex = new BehaviorSubject<number>(0);
  submitButtonObserver = this.cIndex.asObservable();

  createItemComponentFactory;

  createItemTemplateReference;

  createCommonComponentFactory = [];

  createCommonItemTemplateReference = [];

  previousLabel;
  attributeIDControldata;
  headerItems = [];

  lineItems = [];

  unitData: lineItem[] = [];

  headerAttributeID = [];

  requestLabels = {};

  @ViewChild('dekitTemplate', { static: false, read: ViewContainerRef }) dekitTemplate: ViewContainerRef;

  @ViewChild('buttonTemplate', { static: false }) buttonTemplate: TemplateRef<any>;
  trackingNumberTemplate: ComponentRef<GrsInputComponent>;
  channelComponent;
  channelTemplate: ComponentRef<GrsInputComponent>;
  referenceNo: string;
  specaText: string;
  showSubitButton: boolean;
  customerId: string;
  isDeKitInfoExist: boolean;
  isdialogClosed: boolean;
  isTrackingInvalid: boolean;
  istrackingNumberExistErrorInfo;
  isTrackingInvalidInfo = ' Please check TrackingId.';
  CommentWrkStnErrorInfo = ' Please enter the comment*';
  isCommentWrkStnErrorInfo: boolean;
  isunitErrorInfo: boolean;
  iscounthqidErrorInfo: boolean;
  counthqidErrorInfo = 'Please enter the HQID';
  unitErrorInfo = 'Please enter the unit';
  unitmissing: boolean;
  ipAddress;
  isBoxComplianceAttr = false;
  defaultValuePopulator = [];
  constructor(
    private http: HttpClient,
    private formValidation: CustomFormValidators,
    private componentFactory: ComponentFactoryResolver,
    private builder: FormBuilder,
    private generateReference: CreateReferenceNumber,
    private auth: AuthStateService,
    private gql: DekitAPIService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: Router,
    private locationService: LocationService) {
    this.initializeForm();
  }
  ngOnDestroy(): void {
    this.dekitTemplate.clear();
  }
  ngAfterViewInit(): void {
    Promise.resolve(null).then(data => this.buildDynamicForm());
  }

  initializeForm() {
    const pattern = '^[a-zA-Z0-9]*';
    this.dekitTrackingForm = this.builder.group({
      custTrackingNumber: this.builder.control('', [Validators.required]),
      channel: this.builder.control(''),
      comment: new FormControl(''),
      WorkStation: new FormControl('')
      // WorkStation: new FormControl( {value: this.ipAddress, disabled: true })
    });
  }

  unitValidation(dekitRequest) {
    console.log(dekitRequest.header.line);
    if (dekitRequest.header.line.length >= 1) {
      this.isunitErrorInfo = false;
    } else {
      this.isunitErrorInfo = true;
    }

  }

  unitMissingVadlidation(dekitRequest) {
    let unitFlg = false;
    console.log(dekitRequest.header.line);
    dekitRequest.header.line.forEach((value) => {
      if (value.item != null) {
        if (value.item.hqid.length === 0) {
          console.log('null');
          unitFlg = true;
        }
        return this.unitmissing = unitFlg;
      }
      return this.unitmissing = unitFlg;
    });
  }

  commentWorkstationValidation() {
    const comments = this.dekitTrackingForm.controls.comment.value;
    const workstation = this.dekitTrackingForm.controls.WorkStation.value;
    if (comments && workstation !== null) {
      this.isCommentWrkStnErrorInfo = false;
    } else {
      this.isCommentWrkStnErrorInfo = true;
    }
  }

  hqidValidations() {
    // console.log('specaText::  ', this.dekitTrackingForm.controls.'this.specaText].value);
    let erFlg = false;
    // tslint:disable-next-line: no-unused-expression
    this.dekitTrackingForm.controls[this.specaText].value.unitValues.forEach((value) => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < value.unitArrayValues.length; i++) {
        if (value.unitArrayValues[i] === '') {
          erFlg = true;
        }
      }
      return this.iscounthqidErrorInfo = erFlg;
    });
  }

  get getTrackingNumber() {
    return this.dekitTrackingForm.get('custTrackingNumber') as FormControl;
  }

  ngOnInit() {
    this.getIP();
    this.submitButtonObserver.subscribe(index => {
      if (this.dekitGetConfigDataAttributeLength > 0) {
        if ((index + 1) === this.dekitGetConfigDataAttributeLength) {
          this.showSubitButton = true;
        } else {
          this.showSubitButton = false;
          this.iscounthqidErrorInfo = false;
          this.isCommentWrkStnErrorInfo = false;
          this.isunitErrorInfo = false;
          this.unitmissing = false;
        }
      } else {
        this.showSubitButton = false;
        this.iscounthqidErrorInfo = false;
        this.isCommentWrkStnErrorInfo = false;
        this.isunitErrorInfo = false;
        this.unitmissing = false;
      }
    });
  }
  getIP() {
    this.dekitTrackingForm.get('WorkStation').disable();
    this.http.get<{ ip: string }>('https://jsonip.com')
      .subscribe(data => {

        this.ipAddress = data.ip;
      });
    return this.ipAddress;
  }

  buildDynamicForm() {
    this.buildTrackingNumberField(this.getTrackingNumber, 'Enter trackingID', 'Tracking ID', 0, null, true);
  }

  resetFormToInitialState() {
    this.dekitTrackingForm.reset();
  }

  async clearFormArrayValues(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }

  /* This function syncs the index based on the random slection by user  */
  async syncComponentIndexOnInputSelection(label: string) {
    for (let i = 0; i < this.dekitGetConfigData.attributes.length; i++) {
      if (label === this.dekitGetConfigData.attributes[i].attributeName) {
        this.componentIndex = i + 1;
        this.cIndex.next(i + 1);
      }
    }
    /* Imporant code to clear away the components that are greater than currentIndex!*/
    await this.destroyComponentBasedOnUserSelection(this.componentIndex, label);
  }

  async destroyComponentBasedOnUserSelection(resetIndex: number, label: string, isTrackingID?: boolean, trackingIdValue?: string) {
    if (isTrackingID) {
      this.clearItemsViewComponent();
      this.dekitTrackingForm.reset();
      this.initializeForm();
      for (const template of this.createCommonItemTemplateReference) {
        if (template !== undefined) {
          (template as ComponentRef<any>).destroy();
        }

      }
    } else if (resetIndex < this.createCommonItemTemplateReference.length) {
      for (let i = resetIndex; i < this.createCommonItemTemplateReference.length; i++) {
        if (this.createCommonItemTemplateReference[i] === undefined) {

        } else {
          (this.createCommonItemTemplateReference[i] as ComponentRef<any>).destroy();
        }

      }
      // Check here! Important! -- Dont hard-code!
      if (await this.isTextFieldValidForClearingProcess(label)) {
        this.clearItemsViewComponent();
      }
    }
  }

  /* This function only for deviceId's like hqid */
  async clearItemsViewComponent() {
    if (this.createItemTemplateReference === undefined) {

    } else {
      (this.createItemTemplateReference as ComponentRef<any>).destroy();
    }
  }



  async isTextFieldValidForClearingProcess(attributeLabel: string) {
    let specialTextFieldIndex;
    let clearingIndex;
    for (let i = 0; i < this.dekitGetConfigData.attributes.length; i++) {
      const attributeData = this.dekitGetConfigData.attributes[i];
      if (attributeData.parentidId !== null) {
        specialTextFieldIndex = i;
      }
      if (attributeLabel === attributeData.attributeName) {
        clearingIndex = i;
        if (specialTextFieldIndex < clearingIndex) {
          return false;
        }
        if (attributeData.attributeUIControlName === GrsInput.text) {
          /* When Unit type is followed immediately by next input text field
             return false, so we don't delete the hqid or similar type inputs !*/
          if (this.dekitGetConfigData.attributes[i + 1] !== undefined) {
            const nextImmediateAttributeData = this.dekitGetConfigData.attributes[i + 1];
            if (nextImmediateAttributeData.attributeUIControlName === GrsInput.text) {
              return false;
            }
          } else {
            return false;
          }
        }
      }
    }
    return true;
  }

  async buildTrackingNumberField(formControlName, placeHolder: string, textBoxLabel: string,
    numberOfTextFields: number, data: any, isKeypressEvent: boolean,
    textValue?: string) {
    const trackingIDFormControlName = formControlName;
    /* ${textValue} can be blank if text-field needs to be empty  */
    const pattern = '^[a-zA-Z0-9]*';
    const firstNameControl = new FormControl(textValue, [Validators.required]);
    const createComponent = this.componentFactory.resolveComponentFactory(GrsInputComponent);
    this.trackingNumberTemplate = this.dekitTemplate.createComponent(createComponent);
    this.trackingNumberTemplate.instance.customFormGroup = this.dekitTrackingForm;
    this.trackingNumberTemplate.instance.customPlaceHolder = placeHolder;
    this.trackingNumberTemplate.instance.inputType = 'text';
    this.trackingNumberTemplate.instance.label = textBoxLabel;
    this.trackingNumberTemplate.instance.channeleWarning = this.istrackingNumberExistErrorInfo;
    this.trackingNumberTemplate.instance.textBoxlabel = textBoxLabel;
    this.trackingNumberTemplate.instance.formCtrlName = firstNameControl;
    const blockInstance = this.trackingNumberTemplate.instance as GrsInputComponent;
    blockInstance.emitValue.subscribe(async response => {
      firstNameControl.disable();
      this.trackingNumberTemplate.instance.isError = false;
      this.trackingNumberTemplate.instance.errorValue = '';
      await this.submitTrackingNumbetToApi(response);
      firstNameControl.enable();
    });
  }

  async displayChannelForExistingTrackingInfo(channel: string) {

    const firstNameControl = new FormControl({ value: channel, disabled: true });
    if (this.channelTemplate === undefined) {
      this.channelComponent = this.componentFactory.resolveComponentFactory(GrsInputComponent);
      this.channelTemplate =
        this.dekitTemplate.createComponent(this.channelComponent);
    } else if (this.channelTemplate.hostView.destroyed) {
      this.channelComponent = this.componentFactory.resolveComponentFactory(GrsInputComponent);
      this.channelTemplate =
        this.dekitTemplate.createComponent(this.channelComponent);
    }
    this.channelTemplate.instance.customFormGroup = this.dekitTrackingForm;
    this.channelTemplate.instance.customPlaceHolder = '';
    this.channelTemplate.instance.inputType = 'text';
    this.channelTemplate.instance.textBoxlabel = 'Channel';
    this.channelTemplate.instance.formCtrlName = firstNameControl;
  }

  async submitTrackingNumbetToApi(value) {
    if (this.channelTemplate !== undefined && !this.channelTemplate.hostView.destroyed) {
      this.channelTemplate.destroy();
    }

    /* User key press randomly without refresh, change the component index */
    await this.destroyComponentBasedOnUserSelection(1, '', true);
    this.componentIndex = 0; // Make sure component resets again
    this.showSubitButton = false;
    this.iscounthqidErrorInfo = false;
    this.isCommentWrkStnErrorInfo = false;
    this.unitmissing = false;
    this.referenceNo = this.generateReference.generateRefernceNumber + '';
    this.dekitTrackingForm.get('custTrackingNumber').setValue(value);
    if (!this.formValidation.validateFormControl(this.getTrackingNumber as FormControl)) {
      this.isTrackingInvalid = true;
    } else {
      this.isTrackingInvalid = false;
      const createProgressBarComponent = this.componentFactory.resolveComponentFactory(GrsProgressBarComponent);
      const createProgressbarTemplate = this.dekitTemplate.createComponent(createProgressBarComponent);
      createProgressbarTemplate.instance.progressInformation = 'Fetching Details...';
      try {
        const getDekitTrackingResponse = await this.gql.GetDekitTrackingInfo({
          referenceNo: this.referenceNo,
          trackingNumber: this.getTrackingNumber.value,
        });
        this.trackingNumberTemplate.instance.isError = false;
        console.log(getDekitTrackingResponse);
        if (!getDekitTrackingResponse.isDeKitInfoExist) {
          this.isDeKitInfoExist = false;

          if (getDekitTrackingResponse.customerId != null) {
            this.customerId = getDekitTrackingResponse.customerId;
          }
          /* Display Channel with disabled option */
          if (getDekitTrackingResponse.channel !== null) {
            this.displayChannelForExistingTrackingInfo(getDekitTrackingResponse.channel);
          }

          this.dekitGetConfigData = await this.gql.GetDekitConfigInfo({
            deKitLocationId: this.locationService.getLocationId,
            referenceNo: this.referenceNo,
            customerId: getDekitTrackingResponse.customerId
          });
           /*Getting CustomerId from GetDekitConfig API for Save Dekit */
          if (this.dekitGetConfigData.customerId) {
            this.customerId = this.dekitGetConfigData.customerId;
           }
          if (getDekitTrackingResponse.trackingNumber === null) {
            this.trackingNumberTemplate.instance.errorValue = DekitTrackingErrors.trackingNumberNotExists + this.dekitGetConfigData.
              attributes[0].attributeName;
            this.trackingNumberTemplate.instance.isError = true;
          }
          createProgressbarTemplate.destroy();
          this.dekitGetConfigDataAttributeLength = this.dekitGetConfigData.attributes.length;
          const controldata = this.dekitGetConfigData.attributes[this.componentIndex];
          this.attributeIDControldata = controldata;
          await this.proceedToBuildNextComponent(controldata, null);
        } else {
          this.isDeKitInfoExist = true;
          this.istrackingNumberExistErrorInfo = DekitTrackingErrors.dekitAlreadyExists + getDekitTrackingResponse.trackingNumber;
          createProgressbarTemplate.destroy();
        }
      } catch (e) {
        createProgressbarTemplate.destroy();
        this.openErrorMessage(DekitApiErrorService.fetchError);
      }
    }
  }

  async proceedToBuildNextComponent(controlData: any, event?: any) {
    console.log(controlData);
    if (controlData.attributeId === 3) {
      this.isBoxComplianceAttr = true;
      this.defaultValuePopulator.push(controlData.attributeName);
    }
    if (controlData.attributeUIControlName === GrsInput.radio) {
      if (this.headerItems.indexOf(controlData.attributeName) === -1) {
        this.headerItems.push(controlData.attributeName);
        this.headerAttributeID.push(controlData.attributeId);
      }
      this.dekitTrackingForm.addControl(controlData.attributeName, this.builder.control({}));
      await this.buildRadioOptionChanges(controlData.values, controlData.attributeName);
    } else if (controlData.attributeUIControlName === GrsInput.dropdown) {
      if (this.headerItems.indexOf(controlData.attributeName) === -1) {
        this.headerItems.push(controlData.attributeName);
        this.headerAttributeID.push(controlData.attributeId);
      }
      this.dekitTrackingForm.addControl(controlData.attributeName, this.builder.control({}));
      await this.buildDropdownChanges(controlData.values, controlData.attributeName);
    } else if (controlData.attributeUIControlName === GrsInput.checkbox) {
      if (this.headerItems.indexOf(controlData.attributeName) === -1) {
        this.headerItems.push(controlData.attributeName);
        this.headerAttributeID.push(controlData.attributeId);
      }
      this.dekitTrackingForm.addControl(controlData.attributeName, this.builder.control({}));
      await this.buildCheckboxChanges(controlData.values, controlData.attributeName);
    } else if (controlData.attributeUIControlName === GrsInput.text) {
      if (this.lineItems.indexOf(controlData.attributeName) === -1) {
        this.lineItems.push(controlData.attributeName);
      }
      if (this.dekitGetConfigData.attributes[this.componentIndex + 1] !== undefined) {
        const tempData = this.dekitGetConfigData.attributes[this.componentIndex + 1];
        if (tempData.attributeUIControlName === GrsInput.text) {
          if (tempData.parentidId !== null) {
            this.createFormArraysForInputText(controlData.values.length,
              this.dekitGetConfigData.attributes[this.componentIndex + 1].attributeName);
          } else {
            this.buildTextFields(tempData.attributeName, 'Units..',
              tempData.attributeName, tempData.values.length, tempData.values, true);
          }
        }
      }
      /* Check here for values, it might be array, a single text. condition is not proper*/
      if (this.dekitGetConfigData.attributes[this.componentIndex].values != null) {
        this.buildTextFields(controlData.attributeName, 'Units..',
          controlData.attributeName, controlData.values.length, controlData.values, true);
      }
    }
  }

  async buildDropdownChanges(data: [], inputLabel: string) {
    const componentTemplate = (this.createCommonItemTemplateReference[this.componentIndex] as ComponentRef<any>);
    if (componentTemplate === undefined) {
      this.createCommonComponentFactory[this.componentIndex] = this.componentFactory.resolveComponentFactory(GrsDropdownComponent);
      this.createCommonItemTemplateReference[this.componentIndex] =
        this.dekitTemplate.createComponent(this.createCommonComponentFactory[this.componentIndex]);
    } else if (componentTemplate.hostView.destroyed) {
      /* Component might have destroyed due to sync process */
      /* Need to create new one if desctroyed*/
      this.createCommonComponentFactory[this.componentIndex] = this.componentFactory.resolveComponentFactory(GrsDropdownComponent);
      this.createCommonItemTemplateReference[this.componentIndex] =
        this.dekitTemplate.createComponent(this.createCommonComponentFactory[this.componentIndex]);
    }

    this.createCommonItemTemplateReference[this.componentIndex].instance.dropdownLabel = inputLabel;
    this.createCommonItemTemplateReference[this.componentIndex].instance.channelDropdown = data;
    if (this.isBoxComplianceAttr) {
      this.createCommonItemTemplateReference[this.componentIndex].instance.isDefaultValue = true;
    }
    const blockInstance = this.createCommonItemTemplateReference[this.componentIndex].instance as GrsDropdownComponent;
    if (this.isBoxComplianceAttr) {
      if (! await this.isFieldinLastIndex(inputLabel)) {
        await this.syncComponentIndexOnInputSelection(inputLabel);
        this.bypassToBuildNextComponent(inputLabel, true);
      }
    }
    blockInstance.dropDownValue.subscribe(async value => {
      if (this.defaultValuePopulator.length > 0) {
        if (this.defaultValuePopulator.indexOf(value.label) === -1) {
          if (! await this.isFieldinLastIndex(value.label)) {
            await this.syncComponentIndexOnInputSelection(value.label);
            await this.handleDropdownChanges(value, true);
          } else {
            await this.handleDropdownChanges(value, false);
          }
        } else {
          console.log(this.dekitTrackingForm.controls[value.label].value);
          (this.dekitTrackingForm.controls[value.label] as FormControl).setValue(value.event.value);
          this.requestLabels[value.label] = value.event.value;
        }
      } else {
        if (! await this.isFieldinLastIndex(value.label)) {
          await this.syncComponentIndexOnInputSelection(value.label);
          await this.handleDropdownChanges(value, true);
        } else {
          await this.handleDropdownChanges(value, false);
        }
      }

    });
  }


  async buildCheckboxChanges(data: [], inputLabel: string) {
    const componentTemplate = (this.createCommonItemTemplateReference[this.componentIndex] as ComponentRef<any>);
    if (componentTemplate === undefined) {
      this.createCommonComponentFactory[this.componentIndex] = this.componentFactory.resolveComponentFactory(GrsCheckboxComponent);
      this.createCommonItemTemplateReference[this.componentIndex] =
        this.dekitTemplate.createComponent(this.createCommonComponentFactory[this.componentIndex]);
    } else if (componentTemplate.hostView.destroyed) {
      this.createCommonComponentFactory[this.componentIndex] = this.componentFactory.resolveComponentFactory(GrsCheckboxComponent);
      this.createCommonItemTemplateReference[this.componentIndex] =
        this.dekitTemplate.createComponent(this.createCommonComponentFactory[this.componentIndex]);
    }
    this.createCommonItemTemplateReference[this.componentIndex].instance.textBoxlabel = inputLabel;
    this.createCommonItemTemplateReference[this.componentIndex].instance.boxValues = data;
    if (this.isBoxComplianceAttr) {
      this.createCommonItemTemplateReference[this.componentIndex].instance.isDeFaultCheckNeeded = false;
    }
    const blockInstance = this.createCommonItemTemplateReference[this.componentIndex].instance as GrsCheckboxComponent;

    if (this.isBoxComplianceAttr) {
      if (! await this.isFieldinLastIndex(inputLabel)) {
        await this.syncComponentIndexOnInputSelection(inputLabel);
        this.bypassToBuildNextComponent(inputLabel, true);
      }
    }
    blockInstance.emitSelectedValues.subscribe(async value => {
      /*Nede to put changes for box compliance ! */
      await this.assignCheckBoxValuesToFormControl(value, inputLabel);
      if (value.length === 1) {
        if (! await this.isFieldinLastIndex(inputLabel)) {
          await this.syncComponentIndexOnInputSelection(inputLabel);
          await this.handleCheckboxChanges(inputLabel, value, true);
        } else {
          await this.handleCheckboxChanges(inputLabel, value, false);
        }
      }
    });

  }

  async isFieldinLastIndex(selectedLabel: string) {
    const controlData = this.dekitGetConfigData.attributes[this.dekitGetConfigDataAttributeLength - 1];
    if (controlData.attributeName === selectedLabel) {
      this.componentIndex = this.componentIndex + 1;
      this.cIndex.next(this.componentIndex);
      await this.syncComponentIndex();
      return true;
    }
    return false;
  }

  async syncComponentIndex() {
    if (this.componentIndex === this.dekitGetConfigDataAttributeLength) {
      this.componentIndex = this.componentIndex - 1;
      this.cIndex.next(this.componentIndex);
    }
  }

  async buildRadioOptionChanges(data: [], inputLabel: string) {
    const componentTemplate = (this.createCommonItemTemplateReference[this.componentIndex] as ComponentRef<any>);
    if (componentTemplate == undefined) {
      this.createCommonComponentFactory[this.componentIndex] = this.componentFactory.resolveComponentFactory(GrsRadioComponent);
      this.createCommonItemTemplateReference[this.componentIndex] =
        this.dekitTemplate.createComponent(this.createCommonComponentFactory[this.componentIndex]);
    } else if (componentTemplate.hostView.destroyed) {
      /* Component might have destroyed due to sync process */
      /* Need to create new one if desctroyed*/
      this.createCommonComponentFactory[this.componentIndex] = this.componentFactory.resolveComponentFactory(GrsRadioComponent);
      this.createCommonItemTemplateReference[this.componentIndex] =
        this.dekitTemplate.createComponent(this.createCommonComponentFactory[this.componentIndex]);
    }
    this.createCommonItemTemplateReference[this.componentIndex].instance.radioLabel = inputLabel;
    this.createCommonItemTemplateReference[this.componentIndex].instance.radioCustomValue = data;
    if (this.isBoxComplianceAttr) {
      this.createCommonItemTemplateReference[this.componentIndex].instance.defaultSelectedValue = false;
    }
    const blockInstance = this.createCommonItemTemplateReference[this.componentIndex].instance as GrsRadioComponent;

    if (this.isBoxComplianceAttr) {
      if (! await this.isFieldinLastIndex(inputLabel)) {
        await this.syncComponentIndexOnInputSelection(inputLabel);
        this.bypassToBuildNextComponent(inputLabel, true);
      }
    }
    blockInstance.selectRadioValue.subscribe(async value => {
      if (this.defaultValuePopulator.length > 0) {
        if (this.defaultValuePopulator.indexOf(value.label) === -1) {
          if (! await this.isFieldinLastIndex(value.label)) {
            await this.syncComponentIndexOnInputSelection(value.label);
            await this.handleRadioChanges(value, true);
          } else {
            await this.handleRadioChanges(value, false);
          }
        } else {
          if(value.checked) {
            (this.dekitTrackingForm.controls[value.label] as FormControl).setValue(value.event);
            this.requestLabels[value.label] = value.event;      
          } else {
            (this.dekitTrackingForm.controls[value.label] as FormControl).setValue(null);
            this.requestLabels[value.label] = null;   
          }
        }
      } else if (! await this.isFieldinLastIndex(value.label)) {
        await this.syncComponentIndexOnInputSelection(value.label);
        await this.handleRadioChanges(value, true);
      } else {
        await this.handleRadioChanges(value, false);
      }
    });
  }

  async assignCheckBoxValuesToFormControl(data: any, inputLabel: string) {
    for (let i = 0; i < this.dekitGetConfigData.attributes.length; i++) {
      const tempData = this.dekitGetConfigData.attributes[i];
      if (tempData.attributeName === inputLabel) {
        if (this.headerItems.indexOf(tempData.attributeName) === -1) {
          this.headerItems.push(tempData.attributeName);
          this.headerAttributeID.push(tempData.attributeId);
        }
        if (this.dekitTrackingForm.get(tempData.attributeName) !== undefined) {
          this.dekitTrackingForm.removeControl(tempData.attributeName);
        }
        this.dekitTrackingForm.addControl(tempData.attributeName, this.builder.control([]));
        this.dekitTrackingForm.get(tempData.attributeName).setValue(data);
        break;
      }
    }
  }

  async handleCheckboxChanges(label: string, data, triggerNextBuild?: boolean) {
    console.log(this.requestLabels[label])
    this.requestLabels[label] = data;
    if (triggerNextBuild) {
      for (let i = 0; i < this.dekitGetConfigData.attributes.length; i++) {
        const tempData = this.dekitGetConfigData.attributes[i];
        if (tempData.attributeName === label) {
          if (this.dekitGetConfigData.attributes[i + 1] !== undefined) {
            const tempValue = this.dekitGetConfigData.attributes[i + 1];
            await this.proceedToBuildNextComponent(tempValue, null);
          } else if (i === this.dekitGetConfigDataAttributeLength) {
            this.showSubitButton = true;
          }
        }
      }
    }
  }

  async handleDropdownChanges(selectChange: any, triggerNextBuild?: boolean) {
    this.requestLabels[selectChange.label] = selectChange.event.value;
    if (this.dekitTrackingForm.controls[selectChange.label] != null) {
      (this.dekitTrackingForm.controls[selectChange.label] as FormControl).setValue(selectChange.event.value);
    }
    const controlName = this.dekitGetConfigData.attributes[this.componentIndex];
    if (this.dekitTrackingForm.get(controlName.attributeName) !== null) {
      this.dekitTrackingForm.removeControl(controlName.attributeName);
    }
    if (triggerNextBuild) {
      await this.proceedToBuildNextComponent(controlName, null);
    } else {
      this.dekitTrackingForm.addControl(controlName.attributeName, this.builder.control({}));
    }
  }

  async handleRadioChanges(selectChange: any, triggerNextBuild?: boolean) {
    if (this.dekitTrackingForm.controls[selectChange.checked]) {
      this.requestLabels[selectChange.label] = selectChange.event;
      (this.dekitTrackingForm.controls[selectChange.label] as FormControl).setValue(selectChange.event);
    } else {
      this.requestLabels[selectChange.label] = null;
      (this.dekitTrackingForm.controls[selectChange.label] as FormControl).setValue(null);
    }
    const controlName = this.dekitGetConfigData.attributes[this.componentIndex];
    if (this.dekitTrackingForm.get(controlName.attributeName) !== null) {
      this.dekitTrackingForm.removeControl(controlName.attributeName);
    }
    if (triggerNextBuild) {
      await this.proceedToBuildNextComponent(controlName, null);
    } else {
      this.dekitTrackingForm.addControl(controlName.attributeName, this.builder.control({}));
    }
  }

  async bypassToBuildNextComponent(label: string, triggerNextBuild?: boolean) {
    let bData = [];
    bData = this.dekitGetConfigData.attributes[this.componentIndex - 1].values;
    // this.requestLabels[label] = bData[0];
    if (this.dekitTrackingForm.controls[label] != null) {
      (this.dekitTrackingForm.controls[label] as FormControl).setValue(bData[0]);
    }
    const controlName = this.dekitGetConfigData.attributes[this.componentIndex];
    if (triggerNextBuild) {
      this.isBoxComplianceAttr = false;
      await this.proceedToBuildNextComponent(controlName, null);
    } else {
      this.dekitTrackingForm.addControl(controlName.attributeName, this.builder.control({}));
    }
  }


  async buildTextFields(
    formControlName, placeHolder: string,
    textBoxLabel: string, numberOfTextFields: number,
    data: any, isKeypressEvent: boolean, textValue?: string) {
    const formHeader = 'formHeader';
    const formHeaderArrayValues = 'formHeaderArrayValues';
    if (this.dekitTrackingForm.controls[formControlName] !== undefined) { // null or undefined
      if ((this.dekitTrackingForm.controls[formControlName] as FormArray).length > 0) {
        this.clearFormArrayValues((this.dekitTrackingForm.controls[formControlName] as FormArray));
      }
    } else if (this.dekitTrackingForm.controls[formControlName] == null) {
      if (this.dekitTrackingForm.controls[formControlName] !== undefined) {
        this.dekitTrackingForm.removeControl(formControlName);
      }
      this.dekitTrackingForm.addControl(formControlName, this.builder.group({
        formHeader: this.builder.array([])
      }));
      for (let i = 0; i < numberOfTextFields; i++) {
        const tempArray = this.builder.group({
          formHeaderArrayValues: this.builder.array([new FormControl('')])
        });
        ((this.dekitTrackingForm.controls[formControlName] as FormGroup)
          .controls[formHeader] as FormArray).push(tempArray);
      }
    }
    if (this.createCommonComponentFactory[this.componentIndex] === undefined) {
      this.createCommonComponentFactory[this.componentIndex] = this.componentFactory.resolveComponentFactory(GrsGroupInputComponent);
      this.createCommonItemTemplateReference[this.componentIndex] =
        this.dekitTemplate.createComponent(this.createCommonComponentFactory[this.componentIndex]);
    }
    if (this.createCommonComponentFactory[this.componentIndex] === null) {
      this.createCommonComponentFactory[this.componentIndex] = this.componentFactory.resolveComponentFactory(GrsGroupInputComponent);
      this.createCommonItemTemplateReference[this.componentIndex] =
        this.dekitTemplate.createComponent(this.createCommonComponentFactory[this.componentIndex]);
    } else if (this.createCommonItemTemplateReference[this.componentIndex].hostView.destroyed) {
      /* Component might have destroyed due to sync process */
      /* Need to create new one if desctroyed*/
      this.createCommonComponentFactory[this.componentIndex] = this.componentFactory.resolveComponentFactory(GrsGroupInputComponent);
      this.createCommonItemTemplateReference[this.componentIndex] =
        this.dekitTemplate.createComponent(this.createCommonComponentFactory[this.componentIndex]);
    }
    this.createCommonItemTemplateReference[this.componentIndex].instance.customFormGroup =
      (this.dekitTrackingForm.controls[formControlName] as FormGroup);
    this.createCommonItemTemplateReference[this.componentIndex].instance.customPlaceHolder = placeHolder;
    this.createCommonItemTemplateReference[this.componentIndex].instance.customFormControl = formControlName;
    this.createCommonItemTemplateReference[this.componentIndex].instance.customLabel = data;
    this.createCommonItemTemplateReference[this.componentIndex].instance.commonLabel = textBoxLabel;
    this.createCommonItemTemplateReference[this.componentIndex].instance.isKeyPressEvent = isKeypressEvent;
    this.createCommonItemTemplateReference[this.componentIndex].instance.formHeader = formHeader; // Test
    this.createCommonItemTemplateReference[this.componentIndex].instance.formHeaderArrayValues = formHeaderArrayValues; // Test
    this.createCommonItemTemplateReference[this.componentIndex].instance.populateBasedOnSpecificIndex = false;
    this.createCommonItemTemplateReference[this.componentIndex].instance.indexer = null;
    const blockInstance = this.createCommonItemTemplateReference[this.componentIndex].instance as GrsGroupInputComponent;
    blockInstance.emitData.subscribe(async event => {
      if (event.fieldIndex !== null && event.fieldValue !== null) {
        if (! await this.isFieldinLastIndex(textBoxLabel)) {
          await this.syncComponentIndexOnInputSelection(textBoxLabel);
        }
      }
      await this.handleTextFieldBasedOnInput(event);
    });
  }

  async handleTextFieldBasedOnInput(event) {
    const numberOfFields = event.fieldValue;
    const formControlIndex = event.fieldIndex;
    if (this.dekitGetConfigData.attributes[this.componentIndex] !== undefined) {
      const controlData = this.dekitGetConfigData.attributes[this.componentIndex];
      const formControlName = controlData.attributeName;
      if (controlData.attributeUIControlName === GrsInput.text) {
        if (this.lineItems.indexOf(controlData.attributeName) === -1) {
          this.lineItems.push(controlData.attributeName);
        }
        /* Added extra condition to check if parentId of attribute equals attribute Id of its preciding attribute  */
        if ((controlData.values.length === 0) &&
          (controlData.parentidId === this.dekitGetConfigData.attributes[this.componentIndex - 1].attributeId)) {
          await this.buildFormControlForImmediateChildTextField(formControlIndex, formControlName,
            controlData.attributeName, 'Enter ' + controlData.attributeName,
            numberOfFields, controlData, false);
        } else if ((this.componentIndex + 1) !== this.dekitGetConfigDataAttributeLength) {
          this.proceedToBuildNextComponent(controlData, null);
        }

      }

      if (controlData.attributeUIControlName === GrsInput.dropdown) {
        this.proceedToBuildNextComponent(controlData, null);
      }
      if (controlData.attributeUIControlName === GrsInput.radio) {
        this.proceedToBuildNextComponent(controlData, null);
      }
      if (controlData.attributeUIControlName === GrsInput.checkbox) {
        this.proceedToBuildNextComponent(controlData, null);
      }
    }
  }

  async createFormArraysForInputText(numberOfGroups, nextImmediateControlNameAfterUnitField) {
    if (this.dekitTrackingForm.controls[nextImmediateControlNameAfterUnitField] !== undefined) {
      this.dekitTrackingForm.removeControl(nextImmediateControlNameAfterUnitField);
    }
    this.dekitTrackingForm.addControl(nextImmediateControlNameAfterUnitField, this.builder.group({
      unitValues: this.builder.array([])
    }));
    for (let i = 0; i < numberOfGroups; i++) {
      const tempArray = this.builder.group({
        unitArrayValues: this.builder.array([])
      });
      ((this.dekitTrackingForm.controls[nextImmediateControlNameAfterUnitField] as FormGroup)
        .controls['unitValues'] as FormArray).push(tempArray);
    }
  }

  async buildFormControlForImmediateChildTextField(formControlIndex, formControlName,
    placeHolder: string, textBoxLabel: string,
    numberOfTextFields: number, data: any,
    isKeypressEvent: boolean, textValue?: string) {
    const unitValues = 'unitValues';
    const unitArrayValues = 'unitArrayValues';
    this.specaText = formControlName;
    const parentFormGroup = (this.dekitTrackingForm.controls[formControlName] as FormGroup);
    const childFormArray = parentFormGroup.controls[unitValues] as FormArray;
    const formGroup = childFormArray.controls[formControlIndex] as FormGroup;
    if ((formGroup.controls[unitArrayValues] as FormArray).length > 0) {
      const formArray = (formGroup.controls[unitArrayValues] as FormArray);
      await this.clearFormArrayValues(formArray);
    }
    for (let i = 0; i < numberOfTextFields; i++) {
      (formGroup.controls[unitArrayValues] as FormArray).push(new FormControl(''));
    }
    if (this.createItemTemplateReference === undefined) {
      this.createItemComponentFactory = this.componentFactory.resolveComponentFactory(GrsGroupInputComponent);
      this.createItemTemplateReference =
        this.dekitTemplate.createComponent(this.createItemComponentFactory);
    } else if (this.createItemTemplateReference.hostView.destroyed) {
      this.createItemComponentFactory = this.componentFactory.resolveComponentFactory(GrsGroupInputComponent);
      this.createItemTemplateReference =
        this.dekitTemplate.createComponent(this.createItemComponentFactory);
    }
    this.createItemTemplateReference.instance.customPlaceHolder = placeHolder;
    this.createItemTemplateReference.instance.customLabel = data.values;
    this.createItemTemplateReference.instance.commonLabel = 'Enter ' + formControlName;
    this.createItemTemplateReference.instance.customClassName = placeHolder;
    this.createItemTemplateReference.instance.isKeyPressEvent = isKeypressEvent;
    this.createItemTemplateReference.instance.customFormGroup = parentFormGroup;
    this.createItemTemplateReference.instance.formHeader = 'unitValues';
    this.createItemTemplateReference.instance.customClass = 'hqid-wrapper';
    if(data.attributeMinValue) {
      this.createItemTemplateReference.instance.fieldMinLength = data.attributeMinValue;
    }
    if(data.attributeMaxValue) {
      this.createItemTemplateReference.instance.fieldMaxLength = data.attributeMaxValue;
    }
    /* Specifying true - populates based on index provided */
    this.createItemTemplateReference.instance.populateBasedOnSpecificIndex = false;
    // this.createItemTemplateReference.instance.indexer = formControlIndex;
    this.createItemTemplateReference.instance.formHeaderArrayValues = 'unitArrayValues';
    await this.checkForNextInputField();
  }

  async checkForNextInputField() {
    if (this.dekitGetConfigData.attributes[this.componentIndex + 1] !== undefined) {
      if (this.dekitGetConfigData.attributes[this.componentIndex + 1] !== null) {
        const controlData = this.dekitGetConfigData.attributes[this.componentIndex + 1];
        await this.proceedToBuildNextComponent(controlData, null);
      }
    }
  }

  async createDekitRequest() {

    this.unitData = [];


    const dekitRequest: SaveDeKitInput = {
      // carrier: 'FedexUSA',
      // channel: null,
      customerId: this.customerId,
      attributeId: this.attributeIDControldata.attributeId,
      trackingNumber: this.getTrackingNumber.value,
      locationId: this.locationService.getLocationId,
      userName: this.auth.getEmail(),
      workStationName: this.dekitTrackingForm.controls.WorkStation.value,
      referenceNo: this.referenceNo + '',
      comments: this.dekitTrackingForm.controls.comment.value,
      header: {
        line: await this.getUnitLevelDetailsToSendRequest()
      },
      attributes: await this.prepareHeaderLevelAttribute()
    };

    this.unitValidation(dekitRequest);
    this.unitMissingVadlidation(dekitRequest);
    this.commentWorkstationValidation();
    if (this.dekitTrackingForm.controls[this.specaText] !== undefined) {
      this.hqidValidations();
    }
    if (!this.isCommentWrkStnErrorInfo && !this.iscounthqidErrorInfo && !this.isunitErrorInfo && !this.unitmissing) {
      this.spinner.show();
      this.gql.SaveDekitInfo(dekitRequest).then(async data => {

        this.gql.GetDekitInfo({
          referenceNo: this.referenceNo,
          trackingNumber: this.getTrackingNumber.value
        }).then(response => {
          this.spinner.hide();
          console.log(response);
          this.route.navigate(['/dashboard/getdekit'], { state: { getDekitData: response, alert: true } });
        }).catch(error => {
          this.spinner.hide();
          this.openErrorMessage(DekitApiErrorService.fetchError);
        });
      }).catch(error => {
        this.spinner.hide();
        this.openErrorMessage(DekitApiErrorService.badRequest);
      });
    }
  }

  openErrorMessage(error) {
    this.snackBar.open(error, 'Close', {
      duration: 5000
    });
  }

  async prepareHeaderLevelAttribute() {
    const attributes: attributeData[] = [];
    for (let i = 0; i < this.headerAttributeID.length; i++) {
      if (this.requestLabels[this.headerItems[i]]) {
        if(this.requestLabels[this.headerItems[i]].length !== undefined) {
          if(this.requestLabels[this.headerItems[i]].length > 0) {
            attributes.push({
              attributeId: this.headerAttributeID[i],
              attributeValues: await this.prepareSubLevelAttribute(i, true)
            });
          }
        } else {
          if (this.requestLabels[this.headerItems[i]].locationAttributeValueId !== -1) {
            attributes.push({
              attributeId: this.headerAttributeID[i],
              attributeValues: await this.prepareSubLevelAttribute(i, false)
            });
          }
        }
      }
    }
    return attributes;
  }

  async prepareSubLevelAttribute(index, isArray?: boolean) {
    const temp = [];
    let tempData = {};
    if(isArray) {
      for (const getTempData of this.requestLabels[this.headerItems[index]]) {
        console.log(getTempData);
        /* Dont send attribute in request if user did not select anything (checkbox) */
        if (getTempData['locationAttributeValueId'] !== -1) {
          temp.push(getTempData);
        }
      }
    } else {
        tempData['locationAttributeValueId'] = this.requestLabels[this.headerItems[index]].locationAttributeValueId;
        tempData['value'] = this.requestLabels[this.headerItems[index]].value;
        temp.push(tempData);
    }
    return temp;
  }

  async preparePopupData(deKitHeaderId) {
    const data = {};
    for (const topField of this.headerItems) {
      Object.keys(this.requestLabels).forEach(item => {
        if (item === topField) {
          data[topField] = this.requestLabels[item].value;
        }
      });
    }
    data['Header ID'] = deKitHeaderId;
    data['Tracking Number'] = this.dekitTrackingForm.controls.custTrackingNumber.value;
    return data;
  }

  async getUnitLevelDetailsToSendRequest() {
    for (const lineItem of this.lineItems) {
      let incrementer = 0;
      for (const item of this.dekitGetConfigData.attributes) {
        incrementer++;
        if ((lineItem === item.attributeName) && (item.attributeUIControlName === GrsInput.text)) {
          const formHeader = 'formHeader';
          const formHeaderArrayValues = 'formHeaderArrayValues';
          const formHeaderGroupArray = (this.dekitTrackingForm.get(lineItem).get(formHeader) as FormArray);
          if (formHeaderGroupArray !== null) {
            for (let i = 0; i < formHeaderGroupArray.length; i++) {
              const unitsEntered = formHeaderGroupArray.controls[i]['controls'][formHeaderArrayValues].value[0];
              if (unitsEntered !== '') {
                /* check if hqid item is present */
                if (this.dekitGetConfigData.attributes[incrementer] === undefined) {
                  this.unitData.push({
                    attributeNameId: item.attributeId,
                    unitName: item.values[i]['value'],
                    numberOfUnits: parseInt(unitsEntered),
                    item: null
                  });
                } else {
                  this.unitData.push({
                    attributeNameId: item.attributeId,
                    unitName: item.values[i]['value'],
                    numberOfUnits: parseInt(unitsEntered),
                    item: await this.getItemLevelDetails(i, item, this.dekitGetConfigData.attributes[incrementer])
                  });
                }
              }
            }
          }
        }
      }
    }
    return this.unitData;
  }

  async getItemLevelDetails(index, currentAttribute, nextAttribute) {
    /* Check if atributeId of unit types is equal to parentId of child attribute!  */
    if (currentAttribute.attributeId === nextAttribute.parentidId) {
      let createItem: item = {
        attributeNameId: null,
        hqid: []
      };
      const unitValues = 'unitValues';
      const formBuilder = (this.dekitTrackingForm.controls[nextAttribute.attributeName] as FormGroup).controls[unitValues] as FormArray;
      createItem.attributeNameId = nextAttribute.attributeId;
      createItem.hqid = (formBuilder.value[index].unitArrayValues);
      createItem.hqid.forEach((value) => {
        if (value === '') {
          createItem = null;
          return createItem;
        }
      });
      return createItem;
    } else {
      return null;
    }
  }

}
