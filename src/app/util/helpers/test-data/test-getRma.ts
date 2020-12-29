import { GetRMAResponse } from 'src/app/services/rest-services/rma-service/rma-api-service';

export const testGetRmaData: GetRMAResponse = {
    rmanumber: 'RMA1234',
    referenceno: 'abcd-123-efgh-456-ijkl',
    rmaorderid: 12345,
    customerrma: '12345',
    customerreference1: 'cust-abcd-efgh-ijkl',
    customerreference2: null,
    customerreference3: null,
    rmatype: 'Return',
    rmaorderstatusid: 1,
    rmaorderstatusvalue: 'Created',
    channel: 'Apple BFI',
    rmacompanyid: 999,
    rmacompanylocationid: 2,
    username: 'test@test.com',
    customerrmacreatedate: new Date(),
    rmacreatedate: new Date(),
    rmacustomeraddress: {
        rmaaddresstype: 'N/A',
        firstname: 'Jon',
        lastname: 'Winterfell',
        name: 'Jon Winterfell',
        addressline1: 'Address Line 1',
        addressline2: 'Address Line 2',
        city: 'Kings landing',
        state: 'TExas',
        zipcode: '678234',
        country: 'USA',
        phonenumber: '99***9904',
        emailaddress: 'test@test.com',
        faxnumber: 'N/A'
    },
    rmainvoiceaddress: {
        rmaaddresstype: 'N/A',
        firstname: 'Jon',
        lastname: 'Snow',
        name: 'Jon Snow',
        addressline1: 'Address Line 1',
        addressline2: 'Address Line 2',
        city: 'Kings landing',
        state: 'Texas',
        zipcode: '678234',
        country: 'USA',
        phonenumber: '9797979797',
        emailaddress: 'test@test.com',
        faxnumber: 'N/A'
    },
    lines: [
        {
            rmaorderlineid: 345,
            customerlinereference: 'Cust ref',
            customerlinereference1: 'Cust ref',
            customerpartnumber: 'RMA-PART-001', // We dont have part description here!
            partnumber: '001',                  // As specified in Images
            quantity: 2,
            isserialized: 1, // Bit in API
            rmalinestatusid: 1,
            rmalinestatusvalue: 'Created',
            rmaitemstatusid: 1,
            rmaitemstatusvalue: 'Created',
            items: [
                {
                    rmaorderitemid: 123,
                    customeritemreference: 'Item Ref 1',
                    serialnumbertype: '1',
                    serialnumber: '3529760942637828',
                    imei: '6666777799998888',
                    currency: 'USD', // Type as float in API
                    baseprice: '10.00', // Type as float in API
                    subsidyamount: '0.00', // Type as float in API
                    promoamount: '0.00', // Type as float in API 
                    quotedamount: '10.00', // Type as float in API
                    deductedamount: '10.00', // Type as float in API
                    returnreason: 'Exchange', // Type as float in API
                    deviceconditions: [
                        {
                            brightstarquestionid: 1,
                            question: 'First pet name',
                            answer: 'cat',
                            customerquestionid: '1',
                        }
                    ]
                },
                {
                    rmaorderitemid: 123,
                    customeritemreference: 'Item Ref 1',
                    serialnumbertype: '1',
                    serialnumber: '3529760942637334',
                    imei: '6666777799998888',
                    currency: 'USD', // Type as float in API
                    baseprice: '10.00', // Type as float in API
                    subsidyamount: '0.00', // Type as float in API
                    promoamount: '0.00', // Type as float in API 
                    quotedamount: '10.00', // Type as float in API
                    deductedamount: '10.00', // Type as float in API
                    returnreason: 'Exchange', // Type as float in API
                    deviceconditions: [
                        {
                            brightstarquestionid: 1,
                            question: 'First pet name',
                            answer: 'cat',
                            customerquestionid: '1',
                        }
                    ]
                }
            ]
        },
        {
            rmaorderlineid: 345,
            customerlinereference: 'Cust ref',
            customerlinereference1: 'Cust ref',
            customerpartnumber: 'RMA-PART-001', // We dont have part description here!
            partnumber: '001',                  // As specified in Images
            quantity: 1,
            isserialized: 1, // Bit in API
            rmalinestatusid: 1,
            rmalinestatusvalue: 'Created',
            rmaitemstatusid: 1,
            rmaitemstatusvalue: 'Created',
            items: [
                {
                    rmaorderitemid: 123,
                    customeritemreference: 'Item Ref 1',
                    serialnumbertype: '1',
                    serialnumber: '352976094261754',
                    imei: '6666777799998888',
                    currency: 'USD', // Type as float in API
                    baseprice: '10.00', // Type as float in API
                    subsidyamount: '0.00', // Type as float in API
                    promoamount: '0.00', // Type as float in API 
                    quotedamount: '10.00', // Type as float in API
                    deductedamount: '10.00', // Type as float in API
                    returnreason: 'Defect', // Type as float in API
                    deviceconditions: [
                        {
                            brightstarquestionid: 1,
                            question: 'First pet name',
                            answer: 'cat',
                            customerquestionid: '1',
                        }
                    ]
                }
            ]
        }
    ],
    trackingdata: {
        carrier : 'Fedex',
        trackingnumber: 'testapp123',
        trackingnumberdate: new Date(),
        trackingreference: 'mnbv-opie-qwer-sdfp'
    }
}