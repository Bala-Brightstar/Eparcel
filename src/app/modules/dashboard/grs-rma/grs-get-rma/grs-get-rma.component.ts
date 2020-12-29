import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { API } from 'aws-amplify';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';
import { GetRMAResponse } from 'src/app/services/rest-services/rma-service/rma-api-service';
import { CreateReferenceNumber } from 'src/app/util/helpers/create-reference';
import { testGetRmaData } from 'src/app/util/helpers/test-data/test-getRma';

@Component({
  selector: 'app-grs-get-rma',
  templateUrl: './grs-get-rma.component.html',
  styleUrls: ['./grs-get-rma.component.scss'],
  providers: [CreateReferenceNumber]
})
export class GrsGetRmaComponent implements OnInit {

  isComponentInitialized = true;
  showButtonSpinner = false;
  inputType = 'text';
  getRmaForm: FormGroup;
  getRmaData: GetRMAResponse;
  showRmaInvalidError = false;
  errorMessage = '';
  showRMAResult = false;
  searchWaitMessage = 'Fetching Results...';

  rmaHeaderLevelAttributes = ['rmanumber'];
  rmaHeaderLevelDescription = ['RMA'];

  customerDetailsHeaderAttributes = ['rmaorderid', 'companyName', 'customerId', 'customerrma', 'rmatype', 'rmaorderstatusvalue', 'customerrmacreatedate', 'channel'];
  customerDetailLabel = ['RMA OrderId', 'Company Name', 'customerId', 'Customer RMA', 'RMA Type', 'RMA Status', 'RMA Create Date', 'channel'];

  customerRmaItemsLineHeaderAttributes = ['partnumber', 'description', 'quantity', 'isserialized', 'rmalinestatusvalue'];
  customerRmaItemsLineHeaderDescription = ['Part Number', 'Part Description', 'Quantity', 'Serialized', 'RMA Line Status'];

  rmaItemsHeaderAttributes = ['serialnumber', 'customeritemreference', 'returnreason'];
  rmaItemsHeaderDescription = ['Serial Number', 'Cust Reference', 'Return Reason'];

  rmaAmountHeaderAttributes = ['baseprice', 'subsidyamount', 'promoamount', 'quotedamount'];
  rmaAmountHeaderDescription = ['Base Price', 'Subsidy Amount', 'Promo Amount', 'Quoted Amount'];

  rmaTrackingheaderAttributes = ['trackingnumber', 'trackingreference', 'carrier', 'trackingnumberdate'];
  rmaTrackingheaderDescription = ['Tracking Number', 'Tracking Reference', 'Carrier', 'Tracking Date'];

  rmaDeviceConditionsAttributeHeader = ['questiontext', 'answer'];
  rmaDeviceConditionsAttributeDescription = ['Question', 'Answer'];
  constructor(private builder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private auth: AuthStateService,
              private refNo: CreateReferenceNumber,
              private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.buildRmaForm();
  }

  async getRMADataFunc(rmanumber) {
    this.spinner.show();
    let response;
    const paramaters = {
      headers: {
        'X-Bstar-Authorization': `Bearer ${this.auth.getJwtToken()}`
      },
      queryStringParameters: {
        rmaNumber: rmanumber,
        requestId: this.refNo.generateRefernceNumber
      }
    };
    response = await API.get('grsrest', '/rma', paramaters).catch(error => {
      this.snackBar.open(error, 'Close', {
        duration: 5000
      });
      this.spinner.hide();
    });
    this.spinner.hide();
    return response;
  }

  async buildRmaForm() {
    this.getRmaForm = this.builder.group({
      rmanumber: this.builder.control('', [Validators.required]),
      channel: this.builder.control('', [Validators.required]),
      customerreference1: this.builder.control('', [Validators.required]),
      rmacreatedate: this.builder.control('', [Validators.required])
    });
    return this.getRmaForm;
  }

  get rmaNumber() {
    return this.getRmaForm.get('rmanumber') as FormControl;
  }

  async getRmaDetails(inBuiltSearch?: boolean) {
    this.showRMAResult = false;
    if (this.rmaNumber.status.toLowerCase() !== 'invalid' && !this.rmaNumber.invalid) {
      this.showRmaInvalidError = false;
      this.errorMessage = '';
      this.getRmaData = await this.getRMADataFunc(this.rmaNumber.value);
      if (this.getRmaData['data']) {
        this.showRMAResult = true;
        this.populateRMADetails(this.getRmaData['data']);
      } else {
        this.showRMAResult = false;
        this.throwErrorMessageToUser(`RMA Number ${this.rmaNumber.value} not found`);
        await this.setFormValuesToInitial();
      }
      console.log(this.getRmaData);
    } else {
      this.showRmaInvalidError = true;
      this.throwErrorMessageToUser('Enter RMA Number');

    }
  }

  async searchRMADetailsFromResponsePage() {
    await this.getRmaDetails(true);
  }

  throwErrorMessageToUser(errorMessage) {
    this.showRmaInvalidError = true;
    this.errorMessage = errorMessage;
  }

  async populateRMADetails(rmaData: GetRMAResponse) {
    if (rmaData.rmanumber !== null) {
      await this.assignValuesToForm();
      return this.isComponentInitialized = false;
    } else {
      return true;
    }
  }

  async assignValuesToForm() {
    for (const attribute of this.rmaHeaderLevelAttributes) {
      if (this.getRmaData['data'][attribute]) {
        this.getRmaForm.controls[attribute].setValue(this.getRmaData['data'][attribute]);
      } else {
        this.getRmaForm.controls[attribute].setValue('');
      }

    }
  }

  async setFormValuesToInitial() {
    for (const attribute of this.rmaHeaderLevelAttributes) {
      this.getRmaForm.controls[attribute].setValue('');
    }
  }

  async reMaptoSearchField() {
    location.reload();
  }

}
