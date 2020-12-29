/**
 * Componenet Name: GrsReceiveRmaComponent
 * Sprint         : Sprint 4 - 33593
 * Purpose        :
 *   The following features are implemented
 *      1.	RMA Receive based on License Plate number
 *      2.	RMA Receive based on Serial number
 *      3.	RMA Receive based on Customer RMA
 * Developer      : JV31831
 *
 */

import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material';
import { ReceiveRMAResponse } from 'src/app/services/rest-services/rma-service/rma-api-service';
import { CreateReferenceNumber } from 'src/app/util/helpers/create-reference';
import { DekitAPIService } from 'src/app/services/graphql-services/dekit-service/dekit-api-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DekitApiErrorService } from 'src/app/util/messages/error-messages/dekit-messages';
import { API } from 'aws-amplify';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';
import { GrsHandsetAttributesComponent } from './grs-handset-attributes/grs-handset-attributes.component';
import { GetAllManufacturers, GetManuFacturer } from 'src/app/services/rest-services/rma-service/rma-handset-service';
import { ReceiveRMA, GetRMAbyLicense } from 'src/app/services/schemas/rma/receive.schema';
import { SerialNumberFormat, SerialNumberHelper, SerialNumberType } from 'src/app/util/helpers/serial-format/serial-formats';
import { GetTacInfo } from 'src/app/services/schemas/tac/tac-schema';
import { APILoader } from 'src/app/util/grs-api-defintions/api-loader';
import { ReceiveConfig } from 'src/app/services/schemas/rma/receive.config-schema';
import { LocationService } from 'src/app/services/location-service/location-service';
import { AlertService, BootstrapAlerts } from 'src/app/services/alert-service/alert-service';
import { testGetTacInfoMatch, testGetTacInfoNotmatch } from 'src/app/util/helpers/test-data/get-tac-info';

@Component({
  selector: 'app-grs-receive-rma',
  templateUrl: './grs-receive-rma.component.html',
  styleUrls: ['./grs-receive-rma.component.scss'],
  providers: [CreateReferenceNumber, SerialNumberHelper]
})
export class GrsReceiveRmaComponent implements OnInit {

  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
  @ViewChild('handsetRef', { static: false }) handsetRef;
  @ViewChild('updateHandsetTemplate', { static: false, read: ViewContainerRef }) updateHandsetTemplate: ViewContainerRef;
  handsetTemplate: ComponentRef<GrsHandsetAttributesComponent>;
  getManufacturerDetails: GetManuFacturer;
  getAllManufacturers: GetAllManufacturers[];
  redirectDekitPage: boolean;
  mainContentShow: boolean;
  imageContentShow: boolean;
  serialCustRefEnableDisbale: boolean;
  searchDisapper: boolean;
  editImei: boolean;
  serialFlag: boolean;
  apiError: boolean;
  licensePlateNumberHide: boolean;
  apierrorMessage;
  successIconMessage;
  searchValue;
  collectChangeValues = [];
  inputType = 'text';
  receiveRmaData: ReceiveRMAResponse;
  receiveRmaInputForm: FormGroup;
  trackingNo;
  referenceNo: string;
  ids;
  custRef;
  receiveRMAResponse: ReceiveRMA;
  licenseResponse: GetRMAbyLicense;

  receivingConfig: ReceiveConfig
  getTacInfo: GetTacInfo;
  isSerialInvalid = false;
  isGetManufaturerRetrieved = false;
  isGetAllManufacturerRetrieved = false;
  isUpdateIMEI = false;
  isUpdateHandset = false;
  isSaveButtonDisabled = false;
  constructor(
    private builder: FormBuilder,
    private snackBar: MatSnackBar,
    private generateReference: CreateReferenceNumber,
    private gql: DekitAPIService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private auth: AuthStateService,
    private refNo: CreateReferenceNumber,
    private componentFactory: ComponentFactoryResolver,
    private serialValidator: SerialNumberHelper,
    private locationService: LocationService,
    private alertService: AlertService) {
  }

  async ngOnInit() {
    this.attributeBuild();
    await this.buildRmaForm();
    this.receivingLob();
  }

  get licenseNumber() {
    return this.receiveRmaInputForm.get('licenseNumber') as FormControl;
  }
  get serialNumber() {
    return this.receiveRmaInputForm.get('serialNumber') as FormControl;
  }
  get customerRefernceNumber() {
    return this.receiveRmaInputForm.get('customerRefernceNumber') as FormControl;
  }
  get channel() {
    return this.receiveRmaInputForm.get('channel') as FormControl;
  }
  get customerId() {
    return this.receiveRmaInputForm.get('customerId') as FormControl;
  }
  get customeritemreference() {
    return this.receiveRmaInputForm.get('customeritemreference') as FormControl;
  }
  get imei() {
    return this.receiveRmaInputForm.get('imei') as FormControl;
  }
  get licenceplateno() {
    return this.receiveRmaInputForm.get('licenceplateno') as FormControl;
  }
  get description() {
    return this.receiveRmaInputForm.get('description') as FormControl;
  }
  get manufacturer() {
    return this.receiveRmaInputForm.get('manufacturer') as FormControl;
  }
  get model() {
    return this.receiveRmaInputForm.get('model') as FormControl;
  }
  get memorySize() {
    return this.receiveRmaInputForm.get('memorySize') as FormControl;
  }
  get color() {
    return this.receiveRmaInputForm.get('color') as FormControl;
  }
  get carrier() {
    return this.receiveRmaInputForm.get('carrier') as FormControl;
  }
  get partNumber() {
    return this.receiveRmaInputForm.get('partNumber') as FormControl;
  }
  get comment() {
    return this.receiveRmaInputForm.get('comment') as FormControl;
  }

  /**
   * Form Building.
   */
  async buildRmaForm() {
    this.receiveRmaInputForm = this.builder.group({
      licenseNumber: this.builder.control(''),
      serialNumber: this.builder.control(''),
      customerRefernceNumber: this.builder.control(''),
      channel: new FormControl(''),
      customeritemreference: new FormControl(''),
      imei: new FormControl('', Validators.required),
      licenceplateno: new FormControl(''),
      customerId: new FormControl(''),
      description: new FormControl(''),
      manufacturer: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      memorySize: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      carrier: new FormControl('', Validators.required),
      partNumber: new FormControl('', Validators.required),
      comment: new FormControl('')
    });
    return this.receiveRmaInputForm;
  }

  attributeBuild() {
    this.redirectDekitPage = false;
    this.imageContentShow = true;
    this.mainContentShow = false;
    this.apiError = false;
  }
   /**
   * Based on LOB licensePlateNumber are hiding .
   */
  receivingLob() {
    if(this.locationService.getLocationId === 2){
      this.serialCustRefEnableDisbale = true;
      this.licensePlateNumberHide = false;
    } else {
      this.serialCustRefEnableDisbale = false;
      this.licensePlateNumberHide = true;
    }
  }

  openHandsetOnInvalidSerialNumber() {
    if (this.isGetAllManufacturerRetrieved && this.isGetManufaturerRetrieved && this.isSerialInvalid) {
      this.openhandset();
    }
  }

  serialEventHandler() {
    let isErrorMessage;
    this.alertService.isErrorMessage$.subscribe(data => isErrorMessage = data);
    if (this.isSerialInvalid || isErrorMessage) {
      this.openhandset();
    }
  }

  /* Create headers for API Requests */
  createHeaderParams() {
    const params = {
      headers: {
        'X-Bstar-Authorization': `Bearer ${this.auth.getJwtToken()}`
      }
    };
    return params;
  }

  /* Invoke when operator updates IMEI or serial */
  async updateIMEI() {
    this.isUpdateIMEI = true;
    this.destroyHandsetTemplate();
    this.serialNumberValidation(this.imei.value);
  }

  openhandset() {
    this.createUpdateHandsetComponent();
  }

  async createUpdateHandsetComponent() {
    if (this.handsetTemplate) {
      if (this.handsetTemplate.hostView.destroyed) {
        await this.handsetTemplateCreator();
      } else {
        await this.destroyHandsetTemplate();
        if (this.isSerialInvalid) {
          await this.handsetTemplateCreator();
        }
      }
    } else {
      await this.handsetTemplateCreator();
    }
  }


  /* Creating Handset Attributes template dynamically */
  async handsetTemplateCreator() {
    this.isUpdateHandset = false;
    const createComponent = this.componentFactory.resolveComponentFactory(GrsHandsetAttributesComponent);
    this.handsetTemplate = this.updateHandsetTemplate.createComponent(createComponent);
    this.handsetTemplate.instance.getManufacturerDetails = this.getManufacturerDetails;
    this.handsetTemplate.instance.receiveInputForm = this.receiveRmaInputForm;
    this.handsetTemplate.instance.getAllManufacturers = this.getAllManufacturers;
    this.handsetTemplate.instance.openhandset = true;
    this.handsetTemplate.instance.destroyHandset = this.handsetTemplate;
    if (this.isSerialInvalid) {
      this.handsetTemplate.instance.isSerialInvalid = true;
    }
    const blockInstance = this.handsetTemplate.instance as GrsHandsetAttributesComponent;
    blockInstance.updateEmitter.subscribe(async data => {
      let formGroup: FormGroup;
      formGroup = data;
      this.manufacturer.setValue(formGroup.get('manufacturerDescriptionValue').value);
      this.model.setValue(formGroup.get('modelDescriptionValue').value);
      this.color.setValue(formGroup.get('colorDescriptionValue').value as FormControl);
      this.memorySize.setValue(formGroup.get('sizeDescriptionValue').value);
      this.carrier.setValue(formGroup.get('carrierDescriptionValue').value);
      this.isUpdateHandset = true;
      await this.serialNumberValidation(this.imei.value);
      this.isProductFamilyValid();
      console.log(this.receiveRmaInputForm)
    });
  }

  async isProductFamilyValid() {
    if(this.color && this.memorySize && this.carrier && this.model && this.manufacturer) {
      this.isSaveButtonDisabled = false;
    }
  }

  /* Closing Handset Attributes sidenav */
  async destroyHandsetTemplate() {
    if (this.handsetTemplate) {
      this.handsetTemplate.hostView.destroy();
    }
  }

  async serialNumberValidation(imei: string) {
    this.isSerialInvalid = false;
    const getSerialFormat = this.serialValidator.GetSerialFormat(imei);
    let findPattern;
    switch (getSerialFormat) {
      case SerialNumberFormat.DecimalIMEI:
        findPattern = this.serialValidator.isPatternValid(imei, this.serialValidator.ImeiPattern);
        if (findPattern) {
          this.getTacInfo = await this.fetchGetTacInfoDetails(imei);
          if (this.getTacInfo) {
            this.compareTacWithCustomerRMA(this.getTacInfo, imei);
          } else {
            this.alertService.showMessageToUser('Invalid TAC. Please Update Handset.', BootstrapAlerts.DANGER, true, true) 
          }
        } else {
          this.isSerialInvalid = true;
        }
        break;
      case SerialNumberFormat.HexMEID:
        findPattern = this.serialValidator.isPatternValid(imei, this.serialValidator.MeidHexPattern);
        /* If pattern matches MeidHex, then convert to IMEI and check pattern then call tacInfo */
        if (findPattern) {
          const convertedSerial = this.serialValidator.GetConvertedSerial(imei,
            SerialNumberType.HexMEID, SerialNumberType.DecimalIMEI);
          if (this.serialValidator.isPatternValid(convertedSerial, this.serialValidator.ImeiPattern)) {
            /* This code is repeated */
            this.getTacInfo = await this.fetchGetTacInfoDetails(imei);
            this.compareTacWithCustomerRMA(this.getTacInfo, imei);
          }
        } else {
          this.isSerialInvalid = true;
        }
        break;
      case SerialNumberFormat.DecimalMEID:
        findPattern = this.serialValidator.isPatternValid(imei, this.serialValidator.MeidDecPattern);
        /* If pattern matches MeidDec, then convert to IMEI and check pattern then call tacInfo */
        if (findPattern) {
          const convertedSerial = this.serialValidator.GetConvertedSerial(imei,
            SerialNumberType.DecimalMEID, SerialNumberType.DecimalIMEI);
          if (this.serialValidator.isPatternValid(convertedSerial, this.serialValidator.ImeiPattern)) {
            /* This code is repeated */
            this.getTacInfo = await this.fetchGetTacInfoDetails(imei);
            this.compareTacWithCustomerRMA(this.getTacInfo, imei);
          }
        } else {
          this.isSerialInvalid = true;
        }
        break;
      case SerialNumberFormat.DecimalESN:
        findPattern = this.serialValidator.isPatternValid(imei, this.serialValidator.EsnDecPattern);
        if (!findPattern) {
          this.isSerialInvalid = true;
          if (this.isUpdateIMEI || this.isUpdateHandset) {
            this.serialEventHandler();
          }
        }
        break;
      case SerialNumberFormat.HexESN:
        findPattern = this.serialValidator.isPatternValid(imei, this.serialValidator.EsnHexPattern);
        if (!findPattern) {
          this.isSerialInvalid = true;
          if (this.isUpdateIMEI || this.isUpdateHandset) {
            this.serialEventHandler();
          }
        }
        break;
      case SerialNumberFormat.Unknown:
        this.isSerialInvalid = true;
        if (this.isUpdateIMEI || this.isUpdateHandset) {
          this.serialEventHandler();
        }
        break;
      default:
        break;
    }
  }

  async compareTacWithCustomerRMA(tacDetails: GetTacInfo, serial: string) {
    for (const line of this.receiveRMAResponse.data.lines) {
      for (const item of line.items) {
        if (serial === item.imei) {
          /* Number or String for modelID ? */
          if (tacDetails.modelid !== line.partInfo.modelId) {
            /* If model is not matching then update model attributes in main screen */
            this.updateProductDetailsFromTacInfo(tacDetails);
          }
          else 
          {
            this.alertService.showMessageToUser('TAC is Valid',BootstrapAlerts.SUCCESS, true, false);
            console.log(this.receiveRmaInputForm);
          }
        }
      }
    }
  }

  /*  If getTACInfo and getCustRMA details not matching, update values of getTACInfo
     1. Update model and modle families
     2. Then operator must update non-tac codes manually else should be allowed to submit/receive */
  async updateProductDetailsFromTacInfo(tacDetails: GetTacInfo) {
    this.model.setValue({
      modelDescription: tacDetails.modeldescription,
      modelCode: tacDetails.modelcode,
      modelId: tacDetails.modelid
    });
    this.manufacturer.setValue({
      manufacturerDescription: tacDetails.manufacturerdescription,
      manufacturerCode: tacDetails.manufacturercode,
      manufacturerId: tacDetails.manufacturerid
    });
    this.color.reset();
    this.memorySize.reset();
    this.carrier.reset();
    this.alertService.showMessageToUser('TAC not matching with RMA. Please Update non TAC attributes', BootstrapAlerts.WARNING, true, true)
  }

  /* Retrieves Manufacturer lists to show up in update attribute screen */
  /* Independent API call */
  async getAllManufacturerList(customerId) {
    const path = `${APILoader.erpManufacturerPath}${this.refNo.generateRefernceNumber}/${customerId}`;
    const manufacturerList = await API.get(APILoader.apiName, path, this.createHeaderParams())
      .catch(error => {
        this.openErrorMessage(error);
      });
    if (manufacturerList) {
      this.getAllManufacturers = manufacturerList.data;
      this.isGetAllManufacturerRetrieved = true;
    }
  }

  /**
   * Fetching Serial item Data for Product Details
   *
   */
  fetchItemData() {
    let responseDataFlg = false;
    const fetchserialData = this.receiveRMAResponse.data.lines;
    fetchserialData.forEach((value) => {
      if (responseDataFlg === false) {
        for (const val of value.items) {
          if (this.serialFlag) {
            if (val.imei === this.serialNumber.value) {
              const setValueData = value.partInfo;
              this.serialNumberValidation(val.imei);
              this.productDetailsSetvalue(setValueData, val);
              responseDataFlg = true;
            }
          } else {
            if (val.customeritemreference === this.customerRefernceNumber.value) {
              const setValueData = value.partInfo;
              this.serialNumberValidation(val.imei);
              this.productDetailsSetvalue(setValueData, val);
              responseDataFlg = true;
            }
          }
        }
      }
    });
  }

  async fetchDetailsForCurrentManufacturer(manufacturerId, manufacturerCode, manufacturerDescription, custId?: string) {
    const path = `${APILoader.erpCurrentManufacturerPath}${this.refNo.generateRefernceNumber}`
      + `/${custId}/${manufacturerId}/${manufacturerCode}`;
    const apiResult = await API.get(APILoader.apiName, path, this.createHeaderParams());
    this.isGetManufaturerRetrieved = true;
    let result: any = {
    };
    result = apiResult.data;
    /* Temporary hack to append manufacturerDescription, probably it should come from api response */
    result.manufacturerDescription = manufacturerDescription;
    this.getManufacturerDetails = result;
  }

  async fetchGetTacInfoDetails(imei: string) {
    const path = `${APILoader.getTacInfo}${this.refNo.generateRefernceNumber}/${imei}`;
    const apiResult = await API.get(APILoader.apiName, path, this.createHeaderParams());
    if(apiResult['data']) {
      return apiResult['data'];
    }
    /* Sending null as of now, if error message needs to sent, it can be taken care in future */
    return null;
  }

  async fetchReceivingConfigAPI() {
    /* Pass the company ID that was received in getBySerialNo or getCustomerByCustNo API's */
    const path = `${APILoader.getReceiveConfig}${this.refNo.generateRefernceNumber}/${this.receiveRMAResponse.data.rmaCompanyId}`;
    const apiResult = await API.get(APILoader.apiName, path, this.createHeaderParams());
    if(apiResult['data']) {
      this.receivingConfig = apiResult['data'];
    } else {
      this.receivingConfig = null;
    }
  }



  async productDetailsSetvalue(setValueData, val) {
    const custId = this.receiveRMAResponse.data.customerId;
    this.customeritemreference.setValue(val.customeritemreference);
    this.imei.setValue(val.imei);
    this.fetchDetailsForCurrentManufacturer(setValueData.manufacturerId,
      setValueData.manufacturerCode, setValueData.manufacturerDescription, custId);
    this.description.setValue(setValueData.description);
    this.manufacturer.setValue({
      manufacturerDescription: setValueData.manufacturerDescription,
      manufacturerCode: setValueData.manufacturerCode,
      manufacturerId: setValueData.manufacturerId
    });
    this.model.setValue({
      modelDescription: setValueData.modelDescription,
      modelCode: setValueData.modelCode,
      modelId: setValueData.modelId
    });
    this.memorySize.setValue({
      memorySizeDescription: setValueData.memorySizeDescription,
      memorySizeCode: setValueData.memorySizeCode,
      memorySizeId: setValueData.memorySizeId
    });
    this.color.setValue({
      colorDescription: setValueData.colorDescription,
      colorCode: setValueData.colorCode,
      colorId: setValueData.colorId
    });
    this.carrier.setValue({
      carrierDescription: setValueData.carrierDescription,
      carrierCode: setValueData.carrierCode,
      carrierId: setValueData.carrierId
    });
    this.partNumber.setValue(setValueData.partNumber);
  }

  /**
   * Fetching CustomerRef item Data for Product Details
   *
   */
  fetchCustReftemData() {
    let responseDataFlg = false;
    const fetchCustRefData = this.receiveRMAResponse.data.lines;
    fetchCustRefData.forEach((value) => {
      if (responseDataFlg === false) {
        for (const item of value.items) {
          if (item.customeritemreference === this.customerRefernceNumber.value) {
            this.serialNumberValidation(item.imei);
            const setValueData = value.partInfo;
            const custId = this.receiveRMAResponse.data.customerId;
            this.customeritemreference.setValue(item.customeritemreference);
            this.imei.setValue(item.imei);
            this.fetchDetailsForCurrentManufacturer(setValueData.manufacturerId,
              setValueData.manufacturerCode, setValueData.manufacturerDescription, custId);
            this.description.setValue(setValueData.description);
            this.manufacturer.setValue({
              manufacturerDescription: setValueData.manufacturerDescription,
              manufacturerCode: setValueData.manufacturerCode,
              manufacturerId: setValueData.manufacturerId
            });
            this.model.setValue({
              modelDescription: setValueData.modelDescription,
              modelCode: setValueData.modelCode,
              modelId: setValueData.modelId
            });
            this.memorySize.setValue({
              memorySizeDescription: setValueData.memorySizeDescription,
              memorySizeCode: setValueData.memorySizeCode,
              memorySizeId: setValueData.memorySizeId
            });
            this.color.setValue({
              colorDescription: setValueData.colorDescription,
              colorCode: setValueData.colorCode,
              colorId: setValueData.colorId
            });
            this.carrier.setValue({
              carrierDescription: setValueData.carrierDescription,
              carrierCode: setValueData.carrierCode,
              carrierId: setValueData.carrierId
            });
            this.partNumber.setValue(setValueData.partNumber);
            responseDataFlg = true;
          }
        }
      }
    });
  }

  /**
   * Fetching CustomerRef item Data for Product Details
   * from license plate API by invoking second
   * API call
   *
   */
  fetchCustRefItemApiData() {
    let responseDataFlg = false;
    const fetchCustRefData = this.receiveRMAResponse.data.lines;
    fetchCustRefData.forEach((value) => {
      if (responseDataFlg === false) {
        for (const val of value.items) {
          if (val.customeritemreference) {
            const setValueData = value.partInfo;
            this.serialNumberValidation(val.imei);
            this.productDetailsSetvalue(setValueData, val);
            responseDataFlg = true;
          }
        }
      }
    });
  }

  /**
   * Fetching CustRef/HQID values to invoke getRMAByCustomerRMA API.
   *
   */
  custRefHQIDNoFetch() {
    let responseDataFlg = false;
    const responseData = this.licenseResponse.data.lines;
    responseData.forEach((value) => {
      if (responseDataFlg === false) {
        for (const vallicensePlate of value.items) {
          if (vallicensePlate.licensePlateNo === this.licenseNumber.value) {
            this.ids = vallicensePlate.attributeValue;
            responseDataFlg = true;
          }
        }
      }
    });
  }

  /**
   * getDeKitByLicensePlateNo plate api starts.
   *
   */
  async getDeKitByLicensePlateNo() {
    this.searchDisapper = false;
    this.custRef = null;
    this.customerRefernceNumber.setValue('');
    this.serialNumber.setValue('');
    this.mainContentShow = false;
    this.isGetManufaturerRetrieved = false;
    this.isGetAllManufacturerRetrieved = false;
    const licenseDetails = this.licenseNumber.value.replace(/\s/g, '');
    if (licenseDetails.length !== 0) {
      this.redirectDekitPage = false;
      this.spinner.show();
      this.licenseResponse = await this.getRMAByLicenseDataFunc(this.licenseNumber.value);
      if (this.licenseResponse.data) {
        if (this.licenseResponse.data.hasOwnProperty('trackingNumber')) {
          this.custRefHQIDNoFetch();
          this.custRef = this.ids;
        }
      }
      if (this.custRef) {
        this.receiveRMAResponse = await this.getRMAByCustomerDataFunc(this.custRef, this.licenseResponse.data.customerID);
        if (this.receiveRMAResponse.data) {
          if (this.licenseResponse.data) {
            this.fetchCustRefItemApiData();
            this.setFormValuesRMA();
            this.fetchReceivingConfigAPI();
            this.getAllManufacturerList(this.receiveRMAResponse.data.customerId);
            this.searchDisapper = true;
            this.apiError = false;
            this.apierrorMessage = this.receiveRMAResponse.msg;
            this.successIconMessage = 'License no';
            this.searchValue = this.licenseNumber.value;
            this.editImei = true;
            this.imageContentShow = false;
            this.mainContentShow = true;
            this.serialCustRefEnableDisbale = false;
            this.spinner.hide();
          } else {
            this.redirectDekitPage = false;
            this.spinner.hide();
            this.setFormValuesRMA();
            this.imageContentShow = false;
            this.apiError = false;
            this.mainContentShow = true;
            this.editImei = true;
          }
        } else {
          this.redirectDekitPage = false;
          this.spinner.hide();
          this.imageContentShow = true;
          this.serialCustRefEnableDisbale = true;
          this.apiError = true;
          this.apierrorMessage = this.receiveRMAResponse.msg;
        }
      } else {
        this.spinner.hide();
        this.apiError = true;
        this.apierrorMessage = this.licenseResponse.msg;
        this.serialCustRefEnableDisbale = true;
        if (this.apierrorMessage) {
          if (this.licenseResponse.hasOwnProperty('trackingNumber')) {
            this.apierrorMessage = this.licenseResponse.msg;
            this.trackingNo = this.licenseResponse.trackingNumber;
            this.redirectDekitPage = true;
            this.serialCustRefEnableDisbale = false;
          }
        }
      }
    } else {
      this.apiError = true;
      this.apierrorMessage = 'Enter license Number';
    }
  }
  /**
   * API Function - bylicenseplateno.
   *
   */
  async getRMAByLicenseDataFunc(value: any) {
    this.spinner.show();
    let response;
    const path = `${APILoader.rmaDekitByLicensePath}${this.refNo.generateRefernceNumber}/${value}`;
    response = await API.get(APILoader.apiName, path, this.createHeaderParams()).catch(error => {
      this.snackBar.open(error, 'Close', {
        duration: 5000
      });
      this.spinner.hide();
    });
    return response;
  }
  /**
   * getRMAByCustomerRMA plate api starts
   *
   */
  async getRMAByCustomerRMA() {
    this.searchDisapper = false;
    this.mainContentShow = false;
    this.isGetManufaturerRetrieved = false;
    this.isGetAllManufacturerRetrieved = false;
    this.licenseNumber.setValue('');
    this.serialNumber.setValue('');
    const customerRefernceNumberDetails = this.customerRefernceNumber.value.replace(/\s/g, '');
    if (customerRefernceNumberDetails.length !== 0) {
      this.spinner.show();
      this.receiveRMAResponse = await this.getRMAByCustomerDataFunc(this.customerRefernceNumber.value);
      if (this.receiveRMAResponse.data) {
        this.searchDisapper = true;
        this.successIconMessage = 'Customer reference no';
        this.searchValue = this.customerRefernceNumber.value;
        this.serialFlag = false;
        this.fetchItemData();
        this.setFormValuesRMA();
        this.fetchReceivingConfigAPI();
        this.getAllManufacturerList(this.receiveRMAResponse.data.customerId);
        this.editImei = true;
        this.apiError = false;
        this.imageContentShow = false;
        this.mainContentShow = true;
        this.spinner.hide();
      } else {
        this.spinner.hide();
        this.apierrorMessage = this.receiveRMAResponse.msg;
        this.apiError = true;
        this.imageContentShow = true;
      }
    } else {
      this.spinner.hide();
      this.imageContentShow = true;
      this.serialCustRefEnableDisbale = true;
      this.apiError = true;
      this.apierrorMessage = 'Enter customer reference Number';
    }
  }
  /**
   *  API Function - bycustomerrma.
   *
   */
  async getRMAByCustomerDataFunc(value: any, custID?: string) {
    this.spinner.show();
    let response;
    let customerId;
    if (custID) {
      customerId = custID;
    } else {
      customerId = null;
    }
    const path = `${APILoader.rmaByCustomerPath}${this.refNo.generateRefernceNumber}/${value}/${customerId}`;
    response = await API.get(APILoader.apiName, path, this.createHeaderParams()).catch(error => {
      this.snackBar.open(error, 'Close', {
        duration: 5000
      });
      this.spinner.hide();
    });
    return response;
  }

  /**
   *  getRMABySerialNo plate api starts
   *
   */
  async getRMABySerialNo() {
    this.searchDisapper = false;
    this.mainContentShow = false;
    this.serialCustRefEnableDisbale = false;
    this.isGetManufaturerRetrieved = false;
    this.isGetAllManufacturerRetrieved = false;
    this.licenseNumber.setValue('');
    this.customerRefernceNumber.setValue('');
    const serialNumberDetails = this.serialNumber.value.replace(/\s/g, '');
    this.serialCustRefEnableDisbale = true;
    if (serialNumberDetails.length !== 0) {
      this.spinner.show();
      this.receiveRMAResponse = await this.getRMABySerialDataFunc(this.serialNumber.value);
      if (this.receiveRMAResponse.data) {
        this.searchDisapper = true;
        this.successIconMessage = 'Serial no ';
        this.searchValue = this.serialNumber.value;
        this.spinner.hide();
        this.setFormValuesRMA();
        this.serialFlag = true;
        this.fetchItemData();
        this.getAllManufacturerList(this.receiveRMAResponse.data.customerId);
        this.fetchReceivingConfigAPI()
        this.editImei = false;
        this.serialCustRefEnableDisbale = true;
        this.imageContentShow = false;
        this.apiError = false;
        this.mainContentShow = true;
      } else {
        this.spinner.hide();
        this.imageContentShow = true;
        this.apierrorMessage = this.receiveRMAResponse.msg;
        this.apiError = true;
        this.serialCustRefEnableDisbale = true;
      }
    } else {
      this.apiError = true;
      this.apierrorMessage = 'Enter serial Number';
      this.serialCustRefEnableDisbale = true;
    }
  }

  /**
   *   API Function - byserialno.
   *
   */
  async getRMABySerialDataFunc(value: any) {
    this.spinner.show();
    let response;
    const path = `${APILoader.rmaBySerialPath}${this.refNo.generateRefernceNumber}/${value}`;
    response = await API.get(APILoader.apiName, path, this.createHeaderParams()).catch(error => {
      this.snackBar.open(error, 'Close', {
        duration: 5000
      });
      this.spinner.hide();
    });
    return response;
  }
  /**
   *   Set Receiving Screen Details.
   *
   */
  setFormValuesRMA() {
    this.channel.setValue(this.receiveRMAResponse.data.channel);
    this.customerId.setValue(this.receiveRMAResponse.data.customerId); // Check if customer id comes in license response
  }

  async valueListener(changes) {
    if (this.collectChangeValues.indexOf(changes.label) !== -1) {
      this.collectChangeValues.splice(changes.label, 1);
    }
    this.collectChangeValues.push(changes.label);
  }

  async updateListener() {
    this.snackBar.open('Updated Successfully', 'Close', {
      duration: 5000
    });
  }

  /**
   *   Redirecting to get Dekit page to show Dekit details.
   *
   */
  createDekitRequest() {
    this.spinner.show();
    this.referenceNo = this.generateReference.generateRefernceNumber + '';
    this.gql.GetDekitInfo({
      referenceNo: this.referenceNo,
      trackingNumber: this.trackingNo
    }).then(response => {
      this.spinner.hide();
      this.route.navigate(['/dashboard/getdekit'], { state: { getDekitData: response } });
    }).catch(error => {
      this.spinner.hide();
      this.openErrorMessage(DekitApiErrorService.fetchError);
    });
  }

  /**
   *   Showing error notification.
   *
   */
  openErrorMessage(error) {
    this.snackBar.open(error, 'Close', {
      duration: 5000
    });
  }

  successIconClose() {
    this.licenseNumber.setValue('');
    this.customerRefernceNumber.setValue('');
    this.serialNumber.setValue('');
    this.searchDisapper = false;
    this.imageContentShow = true;
    this.mainContentShow = false;
  }

  handleDropdownChange(event) {
    this.comment.setValue(event.value);
  }

  saveReceivingData() {
  }

}
