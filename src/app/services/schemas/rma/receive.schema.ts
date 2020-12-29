import { DateTime } from 'aws-sdk/clients/devicefarm';

/**
 * Receive RMA for customerRef & serialno.
 *
 */

export interface ReceiveRMA {
    requestId: string;
    responseId: string;
    data: ReceiceRMAResponse;
    statusCode: number;
    msg?: string;
}

export interface ReceiceRMAResponse {
    customerId: string;
    rmaCompanyId: number;
    rmaNumber: string;
    rmaOrderId: number;
    customerRMA: string;
    customerRef1: string;
    customerRef2: string;
    customerRef3: string;
    channel: string;
    username: string;
    customerRMACreateDate: DateTime;
    rmaCreateDate: DateTime;
    rmatype: string;
    rmaorderstatusid: number;
    rmaorderstatusvalue: string;
    rmaCustomerAddress: RmaAddress;
    rmaInvoiceAddress: RmaAddress;
    lines: RmaLine[];
}

export interface RmaAddress {
    rmaAddressType: string;
    firstName: string;
    lastName: string;
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
    emailAddress: string;
    faxNumber: string;
}
export interface RmaLine {
    rmaOrderLineId: number;
    customerLineReference: string;
    customerLineReference1: string;
    partNumber: string;
    quantity: number;
    isSerialized: boolean;
    rmaLineStatusId: number;
    partInfo: Partinfo;
    items: RmalinesItem[];
}

export interface Partinfo {
    partNumber: string;
    upCcode: string;
    gtin: string;
    description: string;
    shortDescription: string;
    longDescription: string;
    serialized: boolean;
    serialMask: string;
    dsIdentifier: string;
    manufacturerId: number;
    manufacturerCode: string;
    manufacturerDescription: string;
    modelFamilyCode: string;
    modelFamilyDescription: string;
    modelId: number;
    modelCode: string;
    modelDescription: string;
    memorySizeId: number;
    memorySizeCode: string;
    memorySizeDescription: string;
    sizeCode: string;
    sizeDescription: string;
    carrierId: number;
    carrierCode: string;
    carrierDescription: string;
    planCode: string;
    planDescription: string;
    colorId: number;
    colorCode: string;
    colorDescription: string;
    gradeCode: string;
    gradeDescription: string;
    technologyCode: string;
    technologyDescription: string;
    ownerCode: string;
    ownerDescription: string;
    classCode: string;
    classdescription: string;
    groupCode: string;
    groupDescription: string;
    categoryCode: string;
    categoryDescription: string;
    subCategoryCode: string;
    subCategoryDescription: string;
    images?: [];
}

export interface RmalinesItem {
    rmaorderitemid: number;
    customeritemreference: string;
    serialNumberType: string;
    serialNumber: string;
    imei: string;
    currency: string;
    baseprice: string;
    subsidyAmount: string;
    promoAmount: string;
    quotedAmount: string;
    deductedAmount: string;
    returnReason: string;
    deviceconditions: RmalinesitemsDeviceconditions[];
}

export interface RmalinesitemsDeviceconditions {
    brightstarquestionid: number;
    questionText: string;
    answer: string;
    customerquestionid: string;
}


/**
 * schema for GetRMAbyLicense
 *
 */

export interface GetRMAbyLicense {
    requestId: string;
    responseId: string;
    data: DatagetRMAbyLicense;
    statusCode: number;
    msg?: string;
    trackingNumber?: string;
}

export interface DatagetRMAbyLicense {
    trackingNumber: string;
    customerID: string;
    comments: string;
    workStationName: string;
    userName: string;
    transactionDate: DateTime;
    licensePlateNo: string;
    lines: LinesDatagetRMAbyLicense[];
}


export interface LinesDatagetRMAbyLicense {
    attributeName: string;
    attributeValue: string;
    licensePlateNo?: string;
    items?: ItemsLinesDatagetRMAbyLicense[];

}

export interface ItemsLinesDatagetRMAbyLicense {
    attributeName: string;
    attributeValue: string;
    licensePlateNo: string;
}
