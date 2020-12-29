import { GetDeKitData } from 'src/app/services/graphql-services/dekit-service/dekit-api-service';

export const testGetDekitData: GetDeKitData = {
    carrier: 'FedEx',
    channel: 'Apple BFI',
    comments: 'test',
    customerId: '245678',
    userName: 'test@test.com',
    header: {
      line: [
        {
          attributeId: 4,
          attributeName: 'Unit Type',
          attributeValue: 'Apple Phones',
          item: {
            attributeName: 'HQID',
            attributeValues: [
              {
                attributevalue: '12345',
                lineLicensePlateNo: 'ITEMCSO30000000000060BST'
              },
              {
                attributevalue: '345',
                lineLicensePlateNo: 'ITEMCSO30000000000061BST'
              },
              {
                attributevalue: '34344',
                lineLicensePlateNo: 'ITEMCSO30000000000062BST'
              }
            ]
          },
          lineLicensePlateNo: 'LINECSO20000000000058BST'
        },
        {
            attributeId: 4,
            attributeName: 'Unit Type',
            attributeValue: 'Apple Laptop',
            item: {
              attributeName: 'HQID',
              attributeValues: [
                {
                  attributevalue: '12345',
                  lineLicensePlateNo: 'ITEMCSO30000000000060BST'
                },
                {
                  attributevalue: '345',
                  lineLicensePlateNo: 'ITEMCSO30000000000061BST'
                },
                {
                  attributevalue: '34344',
                  lineLicensePlateNo: 'ITEMCSO30000000000062BST'
                }
              ]
            },
            lineLicensePlateNo: 'LINECSO20000000000058BST'
          },
          {
            attributeId: 4,
            attributeName: 'Unit Type',
            attributeValue: 'Apple Laptop',
            item: {
              attributeName: 'HQID',
              attributeValues: [
                {
                  attributevalue: '12345',
                  lineLicensePlateNo: 'ITEMCSO30000000000060BST'
                },
                {
                  attributevalue: '345',
                  lineLicensePlateNo: 'ITEMCSO30000000000061BST'
                },
                {
                  attributevalue: '34344',
                  lineLicensePlateNo: 'ITEMCSO30000000000062BST'
                }
              ]
            },
            lineLicensePlateNo: 'LINECSO20000000000058BST'
          }
      ]
    },
    headerLicensePlateNo: 'HEADERCSO10000000000053BST',
    trackingNumber: '345677',
    transactionDate: '2020-09-08T13:11:40.732Z',
    workStationName: '2256'
  };

  /* Don't change the data. Unit test */
export const testTrackingNumber: GetDeKitData = {
  carrier: 'FedEx',
  channel: 'Apple BFI',
  comments: 'test',
  customerId: '245678',
  userName: 'test@test.com',
  header: {
    line: [
      {
        attributeId: 4,
        attributeName: 'Unit Type',
        attributeValue: 'Apple Phones',
        item: null,
        lineLicensePlateNo: 'LINECSO20000000000058BST'
      }
    ]
  },
  headerLicensePlateNo: 'HEADERCSO10000000000053BST',
  trackingNumber: null,
  transactionDate: '2020-09-08T13:11:40.732Z',
  workStationName: '2256'
};

