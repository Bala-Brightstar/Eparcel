
import { Injectable } from '@angular/core';
import API, { graphqlOperation } from '@aws-amplify/api';

export type SearchDeKitTrackingDataInput = {
    referenceNo: string;
    trackingNumber: string;
    carrier?: string | null;
    channel?: string | null;
    transactionDate?: string | null;
    customerId?: string | null;
};

export type GetDeKitConfigInput = {
    customerId?: string | null;
    deKitLocationId: number;
    referenceNo: string
};

export type SaveDeKitInput = {
    trackingNumber: string;
    customerId: string;
    comments: string;
    locationId: number;
    attributeId: number;
    // carrier?: string | null;
    // channel?: string | null;
    workStationName: string;
    userName: string;
    referenceNo: string;
    header: headerData;
    attributes: attributeData[];
};

export type attributeData = {
    attributeId: number;
    attributeValues: attributeValueData[];
};

export type attributeValueData = {
    locationAttributeValueId: number;
    value: string;
};
export type GetDeKitInput = {
    trackingNumber: string,
    referenceNo: string
};

export type headerData = {
    // BOX_COMPLIANCE?: boxComplianceData;
    line: lineItem[];
};

export type boxComplianceData = {
    locationAttributeValueId: number;
    value: string;
};

export type lineItem = {
    attributeNameId: number;
    unitName: string;
    numberOfUnits: number;
    item: item;
};

export type item = {
    attributeNameId: number;
    hqid: [];
};

export type SaveDeKitResponseData = {
    referenceNo: string;
    deKitHeaderId: number;
}

export type SearchDeKitTrackingDataQuery = {
    referenceNo: string;
    trackingNumber: string;
    carrier: string | null;
    channel: string | null;
    transactionDate: string | null;
    customerId: string | null;
    isDeKitInfoExist: boolean;
};

export type GetDekitConfigInfoQuery = {
    addressLine1: string | null;
    addressLine2: string | null;
    city: string | null;
    country: string | null;
    customerId: string | null;
    referenceNo: string | null;
    state: string | null;
    warehouse: string | null;
    zipcode: string | null;
    attributes: Array<{
        attributeDataType: string | null;
        attributeDataTypeId: number;
        attributeLength: number;
        values: [] | null;
        attributeUIControlName: string;
        attributeName: string;
        attributeMinValue: number;
        attributeId: number;
        attributeMaxValue: string;
        attributeDescription: string;
        parentidId: number;
        attributeUIControlId: number;
        sequence: number;
    }>
};

export type GetDeKitData = {
    trackingNumber: string
    carrier: string
    channel: string
    customerId: string
    userName: string
    comments: string
    workStationName: string
    transactionDate: string
    headerLicensePlateNo: string
    header: getHeaderData
};

export type getHeaderData = {
    line: lineData[]
};

export type lineData = {
    lineLicensePlateNo: string
    attributeId: number
    attributeName: string
    attributeValue: string
    numberOfUnits?: number;
    item: itemData
};

export type itemData = {
    attributeName: string
    attributeValues: attributeValue[]
};

export type attributeValue = {
    attributevalue: string
    lineLicensePlateNo: string
};



@Injectable({
    providedIn: "root"
})
export class DekitAPIService {

    async SaveDekitInfo(input: SaveDeKitInput): Promise<SaveDeKitResponseData> {
        const statement = `mutation saveDeKit($input: SaveDeKitInput) {
      saveDeKit(saveDeKitInput: $input) {
        referenceNo
        deKitHeaderId
      }
    }`;
        const gqlAPIServiceArguments: any = {
            input
        };
        const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
        return <SaveDeKitResponseData | null>response.data.saveDeKit;
    }

    async GetDekitTrackingInfo(input: SearchDeKitTrackingDataInput): Promise<SearchDeKitTrackingDataQuery> {
        const statement = `query getTrackingInfo($input: SearchDeKitTrackingDataInput) {
      getTrackingInfo(searchDeKitTrackingDataInput: $input) {
        referenceNo
        trackingNumber
        carrier
        channel
        transactionDate
        customerId
        isDeKitInfoExist
      }
    }`;
        const gqlAPIServiceArguments: any = {
            input
        };
        const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
        return response.data.getTrackingInfo as SearchDeKitTrackingDataQuery | null;
    }

    async GetDekitConfigInfo(input: GetDeKitConfigInput): Promise<GetDekitConfigInfoQuery> {
        const statement = `query getDeKitConfig($input: GetDeKitConfigInput) {
      getDeKitConfig(getDeKitConfigInput: $input) {
        referenceNo
        addressLine1
        addressLine2
        city
        country
        customerId
        state
        warehouse
        zipcode
        attributes {
          attributeDataType
          attributeDataTypeId
          attributeLength
          values{
            locationAttributeValueId
            value
          }
          attributeUIControlName
          attributeName
          attributeMinValue
          attributeId
          attributeMaxValue
          attributeDescription
          parentidId
          attributeUIControlId
          sequence
        }
      }
    }`;
        const gqlAPIServiceArguments: any = {
            input
        };
        const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
        return response.data.getDeKitConfig as GetDekitConfigInfoQuery | null;
    }

    async GetDekitInfo(input: GetDeKitInput): Promise<GetDeKitData> {
        const statement = `query getDeKit($input: GetDeKitInput) {
        getDeKit(getDeKitInput: $input) {
          carrier
          channel
          comments
          customerId
          userName
          header {
            line {
              attributeId
              attributeName
              attributeValue
              numberOfUnits
              item {
                attributeName
                attributeValues {
                  attributevalue
                  lineLicensePlateNo
                  }
                }
            lineLicensePlateNo
          }
        }
          headerLicensePlateNo
          trackingNumber
          transactionDate
          workStationName
          }
        }`;
        const gqlAPIServiceArguments: any = {
            input
        };
        const response = (await API.graphql(graphqlOperation(statement, gqlAPIServiceArguments))) as any;
        return response.data.getDeKit as GetDeKitData | null;
    }

}
