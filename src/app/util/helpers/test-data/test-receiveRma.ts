import { ReceiveRMAResponse } from 'src/app/services/rest-services/rma-service/rma-api-service';


// Liscense pleate no response
export const LiscenseplateNotfound = {
        statusCode: 200,
        msg: 'License Plate Number not found. Please enter customer reference'
};

export const LiscenseplateItemLevel = {
    statusCode: 200,
    msg: 'License Plate Number not found at item level.',
    licensePlateNumber: 'HEADERCSO10000000000001BST',
    trackingNumber: 'AppGRS567'
};

export const SucessLiscenseplate = {
        requestId: '9af1668f-6033-4736-8962-79f0fa8c6f87',
        responseId: '43963703-af42-4db3-8b74-4208050b5a82',
        data: {
            trackingNumber: 'Dekit2256',
            customerID: '245678',
            comments: 'testing after clean the database',
            workStationName: '2256',
            userName: 'Jegan.Viswanathan@brightstar.com',
            transactionDate: '2020-10-22T05:11:40.471Z',
            licensePlateNo: 'HEADERCSO10000000000001BST',
            lines: [
                {
                    attributeName: 'Unit Type',
                    attributeValue: 'Apple Phones',
                    licensePlateNo: 'LINECSO20000000000001BST',
                    items: [
                        {
                            attributeName: 'HQID',
                            attributeValue: '1111',
                            licensePlateNo: 'ITEMCSO30000000000001BST'
                        },
                        {
                            attributeName: 'HQID',
                            attributeValue: '2222',
                            licensePlateNo: 'ITEMCSO30000000000002BST'
                        }
                    ]
                },
                {
                    attributeName: 'Unit Type',
                    attributeValue: 'Apple Tablets',
                    licensePlateNo: 'LINECSO20000000000002BST',
                    items: [
                        {
                            attributeName: 'HQID',
                            attributeValue: '33333',
                            licensePlateNo: 'ITEMCSO30000000000003BST'
                        },
                        {
                            attributeName: 'HQID',
                            attributeValue: '44444',
                            licensePlateNo: 'ITEMCSO30000000000004BST'
                        }
                    ]
                }
            ]
        },
        statusCode: 200
    };


// serialno response
export const testDataAPIUnsucess = {
        statusCode: 200,
        msg: 'SerialNo does not exists'
    };


export const testDataAPI = {
    rmaNumber: 'RMA20000000077',
    rmaOrderId: 206,
    customerRMA: 'CUSTOMER_RMA',
    customerRef1: 'CUSTOMER_REF_1',
    customerRef2: 'CUSTOMER_REF_2',
    customerRef3: 'CUSTOMER_REF_3',
    channel: 'AppleBFI',
    username: 'ravi.shankar@brightstar.com',
    customerRMACreateDate: '2020-11-02T04:21:31.362Z',
    rmaCreateDate: '2020-11-02T04:21:31.362Z',
    rmatype: 'BBTI',
    rmaorderstatusid: 1,
    rmaorderstatusvalue: 'Open',
    rmaCustomerAddress: {
        rmaAddressType: 'Home',
        firstName: 'Ravi',
        lastName: 'Shankar',
        name: 'Ravi Shankar',
        addressLine1: '21 New Delhi',
        addressLine2: 'East of Kailsh',
        city: 'New Delhi',
        state: 'New Delhi',
        zipCode: '110065',
        country: 'India(IN)',
        phoneNumber: '9999999987',
        emailAddress: 'ravi05cse@gmail.com',
        faxNumber: 'FAX-0110986566'
    },
    rmaInvoiceAddress: {
        rmaAddressType: 'Store',
        firstName: 'Sriram',
        lastName: 'Shankar',
        name: 'Sriram',
        addressLine1: '55 Chennai',
        addressLine2: 'Chennai city',
        city: 'Channai',
        state: 'Tamilnadu',
        zipCode: '126587',
        country: 'India(IN)',
        phoneNumber: '8765435670',
        emailAddress: 'sriramravishankar@gmail.com',
        faxNumber: 'FAX033224567'
    },
    lines: [
        {
            rmaOrderLineId: 146,
            customerLineReference: 'CUST_REF_1',
            customerLineReference1: 'CUST_REF_2',
            partNumber: 'UIP11PM256417I000G30',
            quantity: 1,
            isSerialized: true,
            rmaLineStatusId: 3,
            partInfo: {
                partNumber: 'UIP11PM256417I000G30',
                upCcode: '076768875',
                gtin: 'UIP11PM256',
                description: 'APL IP11PM GLD 256G A2219 DST',
                shortDescription: '5902-225-2',
                longDescription: 'AA-BBBBBB-CCCCCC-DD',
                serialized: true,
                serialMask: '999999999999999',
                dsIdentifier: 'DS',
                manfacturerCode: 'Apl',
                manfacturerDescription: 'Apple',
                modelFamilyCode: 'MODELFAMILY_CODE1',
                modelFamilyDescription: 'description',
                modelCode: 'IP11P',
                modelDescription: 'APL IP11P',
                memorySizeCode: '16GB',
                memorySizeDescription: '16GB',
                sizeCode: '10.6',
                sizeDescription: '10.6',
                carrierCode: 'Spt',
                carrierDescription: 'Sprint',
                planCode: 'PST',
                planDescription: 'Postpaid',
                colorCode: 'BLK',
                colorDescription: 'Black',
                gradeCode: 'ASTOCK',
                gradeDescription: 'ASTOCK',
                technologyCode: 'CDMA',
                technologyDescription: 'CDMA',
                ownerCode: 'BRI',
                ownerDescription: 'Brightstar Owned',
                classCode: 'HND',
                classdescription: 'Handsets',
                groupCode: 'TER',
                groupDescription: 'HANDSETS- REFURBISHED',
                categoryCode: 'BBK004',
                categoryDescription: 'BUY BACK HANDSET AS IS',
                subCategoryCode: 'A1522',
                subCategoryDescription: 'APL IPHN 6 PLUS',
                images: [
                    {
                        imageTypeCode: 'Main',
                        imageName: 'my-image.jpg',
                        imagePath: ''
                    },
                    {
                        imageTypeCode: 'Alternate',
                        imageName: 'alt-my-image.jpg',
                        imagePath: ''
                    }
                ]
            },
            items: [
                {
                    rmaorderitemid: 146,
                    customeritemreference: '',
                    serialNumberType: '',
                    serialNumber: '',
                    imei: 'AA-BBBBBB-CCCCCC-DD',
                    currency: '$',
                    baseprice: '9.00',
                    subsidyAmount: '1.00',
                    promoAmount: '2.00',
                    quotedAmount: '9.00',
                    deductedAmount: '5.00',
                    returnReason: 'Want to by some new devices',
                    deviceconditions: [
                        {
                            brightstarquestionid: 11,
                            questionText: 'Is display working?',
                            answer: 'Yes',
                            customerquestionid: 'CUST_Q_ID'
                        }
                    ]
                }
            ]
        },
        {
            rmaOrderLineId: 147,
            customerLineReference: 'CUST_REF_1',
            customerLineReference1: 'CUST_REF_2',
            partNumber: 'UIP11PM256417I000G30',
            quantity: 1,
            isSerialized: true,
            rmaLineStatusId: 3,
            partInfo: {
                partNumber: 'UIP11PM256417I000G30',
                upCcode: '076768875',
                gtin: 'UIP11PM256',
                description: 'APL IP11PM GLD 256G A2219 DST',
                shortDescription: '5902-225-2',
                longDescription: 'AA-BBBBBB-CCCCCC-EE',
                serialized: true,
                serialMask: '999999999999999',
                dsIdentifier: 'DS',
                manfacturerCode: 'Apl',
                manfacturerDescription: 'Apple',
                modelFamilyCode: 'MODELFAMILY_CODE1',
                modelFamilyDescription: 'description',
                modelCode: 'IP11P',
                modelDescription: 'APL IP11P',
                memorySizeCode: '16GB',
                memorySizeDescription: '16GB',
                sizeCode: '10.6',
                sizeDescription: '10.6',
                carrierCode: 'Spt',
                carrierDescription: 'Sprint',
                planCode: 'PST',
                planDescription: 'Postpaid',
                colorCode: 'BLK',
                colorDescription: 'Black',
                gradeCode: 'ASTOCK',
                gradeDescription: 'ASTOCK',
                technologyCode: 'CDMA',
                technologyDescription: 'CDMA',
                ownerCode: 'BRI',
                ownerDescription: 'Brightstar Owned',
                classCode: 'HND',
                classdescription: 'Handsets',
                groupCode: 'TER',
                groupDescription: 'HANDSETS- REFURBISHED',
                categoryCode: 'BBK004',
                categoryDescription: 'BUY BACK HANDSET AS IS',
                subCategoryCode: 'A1522',
                subCategoryDescription: 'APL IPHN 6 PLUS',
                images: [
                    {
                        imageTypeCode: 'Main',
                        imageName: 'my-image.jpg',
                        imagePath: ''
                    },
                    {
                        imageTypeCode: 'Alternate',
                        imageName: 'alt-my-image.jpg',
                        imagePath: ''
                    }
                ]
            },
            items: [
                {
                    rmaorderitemid: 147,
                    customeritemreference: '',
                    serialNumberType: '',
                    serialNumber: '',
                    imei: 'AA-BBBBBB-CCCCCC-EE',
                    currency: '$',
                    baseprice: '9.00',
                    subsidyAmount: '1.00',
                    promoAmount: '2.00',
                    quotedAmount: '9.00',
                    deductedAmount: '25.00',
                    returnReason: 'Want to by some new devices',
                    deviceconditions: [
                        {
                            brightstarquestionid: 11,
                            questionText: 'Is display working?',
                            answer: 'Yes',
                            customerquestionid: 'CUST_Q_ID'
                        }
                    ]
                }
            ]
        }
    ]

};
