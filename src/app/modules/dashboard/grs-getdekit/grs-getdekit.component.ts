import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';
import { AlertService, BootstrapAlerts } from 'src/app/services/alert-service/alert-service';
import { DekitAPIService, GetDeKitData, lineData } from 'src/app/services/graphql-services/dekit-service/dekit-api-service';
import { CreateReferenceNumber } from 'src/app/util/helpers/create-reference';
import { GrsDateUtility } from 'src/app/util/helpers/date-convertors/grs-date-convertors';
@Component({
  selector: 'app-grs-getdekit',
  templateUrl: './grs-getdekit.component.html',
  styleUrls: ['./grs-getdekit.component.scss'],
  providers: [GrsDateUtility, CreateReferenceNumber]
})
export class GrsGetdekitComponent implements OnInit {

  /* Static heading Names */
  trackingNumberHeader = 'Tracking No';
  userIdHeader = 'User ID';
  channelHeader = 'Channel';
  departmentHeader = 'Department';
  boxComplianceHeader = 'Box Compliance';
  dateHeader = 'Date';
  transactionDateHeader = 'Transaction Date';
  customerIdHeader = 'Customer ID';
  workStationHeader = 'Work Station';
  lineLicenceHeader = 'Line Licence';
  headerLicenceHeader = 'Header Licence';
  trackingNumberSearchHeader = 'Search using Tracking number';
  searchButtonHeader = 'Search';

  getDekitForm: FormGroup;
  trackingIDLabel = 'Tracking Number';
  inputType = 'text';

  showButtonSpinner = false;

  attributeName;

  getDekitAttributes = [];

  getDekitData: GetDeKitData;
  lineItems: lineData[] = [];
  nonLineItems: lineData[] = [];

  itemName = [];
  itemLicenceHeader = 'Licence Plate';
  licenceNameForUnit;
  getItemLevelAttributeValues = [];
  getItemlevelLicenceValues = [];
  showDekitInfo: boolean;
  trackingNumberTemplate;
  showDekitInfoError: boolean;
  errorMessage: string;
  isLicencePlateNumberAvailable: boolean;


  /* dynamic css*/
  grsUnitAlignMentBorderBottom: boolean;
  complianceData = [];
  department = [];
  channel = [];
  constructor(
    private builder: FormBuilder,
    private auth: AuthStateService,
    private dateConvertor: GrsDateUtility,
    private getDekitService: DekitAPIService,
    private refNo: CreateReferenceNumber,
    private alertService: AlertService) {
    this.getDekitForm = this.builder.group({
      searchTrackingId: this.builder.control('', [Validators.required]),
      trackingNumber: this.builder.control({ value: '-', disabled: true }),
      channel: this.builder.control({ value: '-', disabled: true }),
      department: this.builder.control({ value: 'Department 1', disabled: true }),
      username: this.builder.control({ value: '-', disabled: true }),
      date: this.builder.control({ value: '-', disabled: true }),
      compliance: this.builder.control({ value: '-', disabled: true }),
      transactionDate: this.builder.control({ value: '-', disabled: true }),
      customerid: this.builder.control({ value: '-', disabled: true }),
      workstation: this.builder.control({ value: '-', disabled: true })
    });
  }

  async ngOnInit() {
    const getDekitData = 'getDekitData';
    const alert = 'alert';
    const dekitdata = window.history.state[getDekitData];
    if (dekitdata !== undefined) {
      if (window.history.state[alert]) {
        this.sendAlertsToUser('Dekit Created successfully', BootstrapAlerts.SUCCESS, true, false);
      }
      this.showDekitInfo = true;
      await this.populateDekitData(dekitdata);
    } else {
      this.showDekitInfo = false;
    }
  }

  get getEnteredTrackingNumber() {
    return this.getDekitForm.get('searchTrackingId') as FormControl;
  }

  get getTrackingNumber() {
    return this.getDekitForm.get('trackingNumber') as FormControl;
  }

  get getUserName() {
    return this.getDekitForm.get('username') as FormControl;
  }

  get getChannel() {
    return this.getDekitForm.get('channel') as FormControl;
  }

  get getDate() {
    return this.getDekitForm.get('date') as FormControl;
  }

  get getCompliance() {
    return this.getDekitForm.get('compliance') as FormControl;
  }

  get getTransactionDate() {
    return this.getDekitForm.get('transactionDate') as FormControl;
  }

  get getCustomer() {
    return this.getDekitForm.get('customerid') as FormControl;
  }

  get getWorkStation() {
    return this.getDekitForm.get('workstation') as FormControl;
  }

  async getTrackingInfo() {
    this.showButtonSpinner = true;
    this.getEnteredTrackingNumber.disable();
    const getDekitResponse = await this.getDekitService.GetDekitInfo({
      referenceNo: this.refNo.generateRefernceNumber + '',
      trackingNumber: this.getEnteredTrackingNumber.value
    });
    await this.populateDekitData(getDekitResponse);
    this.showButtonSpinner = false;
  }

  async populateDekitData(dekitData: GetDeKitData) {
    this.getDekitData = dekitData;
    this.channelFinder();
    if (!this.getDekitData) {
      this.showDekitInfo = false;
      this.showDekitInfoError = true;
      this.errorMessage = 'No matching data found';
      this.getEnteredTrackingNumber.enable();
    } else if (!this.getDekitData.trackingNumber) {
      this.showDekitInfo = false;
      this.showDekitInfoError = true;
      this.errorMessage = 'No matching data found';
      this.getEnteredTrackingNumber.enable();
    } else {
      this.showDekitInfo = true;
      this.showDekitInfoError = false;
      this.errorMessage = '';
      this.getTrackingNumber.setValue(this.getDekitData.trackingNumber);
      this.getChannel.setValue(this.getDekitData.channel);
      this.getUserName.setValue(this.getDekitData.userName);
      this.getTransactionDate.setValue(this.getDekitData.transactionDate);
      this.getDate.setValue(this.dateConvertor.converStringToDate(this.getDekitData.transactionDate));
      this.getCustomer.setValue(this.getDekitData.customerId);
      this.getWorkStation.setValue(this.getDekitData.workStationName);
      /* 1. When all contents - item, units are present
          2. When item is not present */
      if (this.getDekitData.header !== null) {
        if (this.getDekitData.header.line.length > 0) {
          const attributes = this.getDekitData.header.line;
          for (const attribute of this.getDekitData.header.line) {

            /* Check if line contains line data */
            if (attribute.numberOfUnits > 0) {
              this.attributeName = attribute.attributeName;
              if (attribute.item === null) {
                this.getDekitForm.addControl(attribute.attributeValue,
                  new FormControl({ value: attribute.numberOfUnits, disabled: true }));
                if (attribute.lineLicensePlateNo !== null) {
                  this.getItemlevelLicenceValues.push(attribute.lineLicensePlateNo);
                }
              } else if (attribute.item !== null) {
                this.isLicencePlateNumberAvailable = true;
                this.getDekitAttributes.push(attribute.attributeValue);
                this.getDekitForm.addControl(attribute.attributeValue,
                  new FormControl({ value: attribute.item.attributeValues.length, disabled: true }));
                this.itemName.push(attribute.item.attributeName);
                if (attribute.item.attributeValues.length > 0) {
                  for (const itemvalue of attribute.item.attributeValues) {
                    this.getItemLevelAttributeValues.push(itemvalue.attributevalue);
                    if (itemvalue.lineLicensePlateNo !== null) {
                      this.getItemlevelLicenceValues.push(itemvalue.lineLicensePlateNo);
                    } else {
                      this.isLicencePlateNumberAvailable = false;
                      this.grsUnitAlignMentBorderBottom = true;
                    }
                  }
                }
              }
            }

          }
        }
      }
      for (let i = 0; i < this.getDekitData.header.line.length; i++) {
        if (this.getDekitData.header.line[i].numberOfUnits === 0) {
          this.nonLineItems.push(this.getDekitData.header.line[i]);
        } else {
          this.lineItems.push(this.getDekitData.header.line[i]);
        }
      }
      this.getDekitData.header.line = this.lineItems;
      if (this.nonLineItems.length > 0) {
        await this.populateNonLineItems();
      }
    }
  }

  async populateNonLineItems() {
    for (const nonLine of this.nonLineItems) {
      if (nonLine.attributeId === 3) {
        this.complianceData.push(nonLine.attributeValue);
      } else if (nonLine.attributeId === 1) {
        this.department.push(nonLine.attributeValue);
      } else if (nonLine.attributeId === 2) {
        this.channel.push(nonLine.attributeValue);
      }
    }
  }

  channelFinder() {
    if (this.getDekitData.channel) {
      this.channel.push(this.getDekitData.channel);
    }
  }

  reMaptoSearchField() {
    location.reload();
  }

  sendAlertsToUser(msg: string, alertType: BootstrapAlerts, isShowMessage: boolean,
    isErrorMessage: boolean, timeout?: number) {
    this.alertService.showMessageToUser(msg, alertType, isShowMessage, isErrorMessage);
  }

}
