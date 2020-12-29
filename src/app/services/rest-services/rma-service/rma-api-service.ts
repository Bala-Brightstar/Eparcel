import { DateTime } from 'aws-sdk/clients/devicefarm';
import { float } from 'aws-sdk/clients/lightsail';


export type GetRMARequestInput = {
    rmanumber: string;
    referenceno: string;
};

export type GetRMAResponse = {
    rmanumber: string;
    referenceno: string;
    rmaorderid: number;
    customerrma: string;
    customerreference1: string;
    customerreference2: string;
    customerreference3: string;
    rmatype: string;
    rmaorderstatusid: number;
    rmaorderstatusvalue: string;
    rmacustomeraddress: RmaAddress;
    rmainvoiceaddress: RmaAddress;
    channel: string;
    rmacompanyid: number;
    rmacompanylocationid: number;
    username: string;
    customerrmacreatedate: DateTime; // Check Datetime
    rmacreatedate: DateTime; // Check Datetime
    lines: RmaLineDetails[];
    trackingdata: TrackingData;
};

export type ReceiveRMAResponse = {
    marketingmodel: string;
    modelvariant: string;
    color: string;
    size: string;
    carrier: string;
    rma: string;
    hqid: string;
    imei: string;
    storeid: string;
    gtinid: string;
    erpid: string;

};
export type ReceiveRMAResponseProduct = {
    marketingmodel: string;
    modelvariant: string;
    color: string;
    size: string;
    carrier: string;

};
export type ReceiveRMAResponseReference = {
    rma: string;
    hqid: string;
    imei: string;

};
export type ReceiveRMAResponseStroreID = {
    storeid: string;
    gtinid: string;
    erpid: string;

};

export type RmaAddress = {
    rmaaddresstype: string,
    firstname: string,
    lastname: string,
    name: string,
    addressline1: string,
    addressline2: string,
    city: string,
    state: string,
    zipcode: string,
    country: string,
    phonenumber: string,
    emailaddress: string,
    faxnumber: string
};

export type RmaLineDetails = {
    rmaorderlineid: number;
    customerlinereference: string;
    customerlinereference1: string;
    customerpartnumber: string;
    partnumber: string;
    quantity: number;
    isserialized: number; // Bit in API
    rmalinestatusid: number;
    rmalinestatusvalue: string;
    items: RmaItemDetails[];
    rmaitemstatusid: number;
    rmaitemstatusvalue: string;
};

export type RmaItemDetails = {
    rmaorderitemid: number;
    customeritemreference: string;
    serialnumbertype: string;
    serialnumber: string;
    imei: string;
    currency: string; // Type as floar in API
    baseprice: string; // Type as floar in API
    subsidyamount: string; // Type as floar in API
    promoamount: string; // Type as floar in API 
    quotedamount: string; // Type as floar in API
    deductedamount: string; // Type as floar in API
    returnreason: string; // Type as floar in API
    deviceconditions: RmaItemDeviceCondition[];
};

export type RmaItemDeviceCondition = {
    brightstarquestionid: number;
    question: string;
    answer: string;
    customerquestionid: string;
};

export type TrackingData = {
    trackingreference: string;
    trackingnumber: string;
    carrier: string;
    trackingnumberdate: DateTime; // Check Datetime
};


