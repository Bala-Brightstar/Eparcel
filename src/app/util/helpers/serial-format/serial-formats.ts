import serialPadding from 'pad';

export enum SerialNumberFormat {
    DecimalESN = 1,
    DecimalMEID = 2,
    HexESN = 3,
    HexMEID = 4,
    DecimalIMEI = 5,
    DecimalIMEISV = 6,
    RawSerialNumber = 7,
    Unknown = -1
}

export enum SerialNumberType {
    DecimalESN = 'DecimalESN',
    DecimalMEID = 'DecimalMEID',
    HexESN = 'HexESN',
    HexMEID = 'HexMEID',
    DecimalIMEI = 'DecimalIMEI',
    DecimalIMEISV = 'DecimalIMEISV',
    RawSerialNumber = 'RawSerialNumber',
    Unknown = 'Unknown'
}

export enum RegexExpressions {
    /* Added from key value pair shared in RLS portal ! */
    RegExp_DecimalSerialMask = '^[0-9]+$',
    RegExp_HexSerialMask = '^[a-fA-F0-9]+$'
}

export class SerialNumberHelper {

    private EsnDecEx = /^(?<v>\d{11})$/;
    private EsnHexEx = /^(?<p>0?[hxHX])?(?<v>[0-9a-fA-F]{2}(?<!80)[0-9a-fA-F]{6})$/;
    private PseudoEsnDecEx = '^(?<v>\d{11})$';
    private PseudoEsnHexEx = '^(?<p>0?[hxHX])?(?<v>80[0-9a-fA-F]{6})$';
    // ImeiEx = '^(?<v>\d{14})((?<c>\d)|(?<sv>\d\d))?$'; Check on this.
    private ImeiEx = /^(?<v>\d{14})(?<c>\d)?$/;
    private MeidDecEx = /^(?<v>\d{18})$/;
    private MeidHexEx = /^(?<p>0?[hxHX])?(?<v>[0-9a-fA-F]{14})$/;
    private ImeiAlphaNumericEx = '^(?<v>\w{15})$';
    EsnDecPattern: RegExp = new RegExp(this.EsnDecEx);
    EsnHexPattern: RegExp = new RegExp(this.EsnHexEx);
    PseudoEsnDecPattern: RegExp = new RegExp(this.PseudoEsnDecEx);
    PseudoEsnHexPattern: RegExp = new RegExp(this.PseudoEsnHexEx);
    ImeiPattern: RegExp = new RegExp(this.ImeiEx);
    MeidDecPattern: RegExp = new RegExp(this.MeidDecEx);
    MeidHexPattern: RegExp = new RegExp(this.MeidHexEx);
    ImeiRegAlphaNumericPattern: RegExp = new RegExp(this.ImeiAlphaNumericEx);

    /*  Determines the serial number format */
    GetSerialFormat(SerialNumber: string) {
        let ReturnValue: SerialNumberFormat = SerialNumberFormat.Unknown;
        if (this.IsDecimalESN(SerialNumber)) {
            console.log('IsDecimalESN ok..');
            ReturnValue = SerialNumberFormat.DecimalESN;
        } else if (this.IsDecimalMEID(SerialNumber)) {
            ReturnValue = SerialNumberFormat.DecimalMEID;
        } else if (this.IsHexESN(SerialNumber)) {
            ReturnValue = SerialNumberFormat.HexESN;
        } else if (this.IsHexMEID(SerialNumber)) {
            ReturnValue = SerialNumberFormat.HexMEID;
        } else if (this.IsDecimalIMEI(SerialNumber)) {
            ReturnValue = SerialNumberFormat.DecimalIMEI;
        } else if (this.IsDecimalIMEISV(SerialNumber)) {
            ReturnValue = SerialNumberFormat.DecimalIMEISV;
        }
        return ReturnValue;
    }

    /*  Determines if serial passed in is DecimalESN
        Returns true if string is Decimal ESN format */
    IsDecimalESN(SerialNumber: string): boolean {
        const expression: RegExp = new RegExp(RegexExpressions.RegExp_DecimalSerialMask);
        return SerialNumber.trim().length === 11
            && expression.test(SerialNumber);
    }

    /*  Determines if serial passed in is DecimalIMEI
        Returns true if string is Decimal IMEI format */
    IsDecimalIMEI(SerialNumber: string): boolean {
        const expression: RegExp = new RegExp(RegexExpressions.RegExp_DecimalSerialMask);
        let returnValue = false;
        switch (SerialNumber.trim().length) {
            case 15: // Has Luhn check Digit
                returnValue = expression.test(SerialNumber);
                break;
            default:
                returnValue = false;
                break;
        }
        return returnValue;

    }

    /*  Determines if serial passed in is Hex ESN
        Returns true if string is Hex ESN format */
    IsHexESN(SerialNumber: string): boolean {
        const expressionHex: RegExp = new RegExp(RegexExpressions.RegExp_HexSerialMask);
        const expressionDecimal: RegExp = new RegExp(RegexExpressions.RegExp_DecimalSerialMask);
        return SerialNumber.trim().length === 8 // must be 8 digits
            && expressionHex.test(SerialNumber);
            // && !expressionDecimal.test(SerialNumber);
    }

    /*  Determines if serial passed in is Hex MEID
        returns true if string is Hex MEID format */
    IsHexMEID(SerialNumber: string): boolean {
        const expressionHex: RegExp = new RegExp(RegexExpressions.RegExp_HexSerialMask);
        const expressionDecimal: RegExp = new RegExp(RegexExpressions.RegExp_DecimalSerialMask);
        return SerialNumber.trim().length === 14
            && expressionHex.test(SerialNumber);
            // && !expressionDecimal.test(SerialNumber);
    }

    /*  Determines if serial passed in is Decimal MEID
    returns true if string is Decimal MEID format */
    IsDecimalMEID(SerialNumber: string): boolean {
        const expression: RegExp = new RegExp(RegexExpressions.RegExp_DecimalSerialMask);
        return expression.test(SerialNumber)
            && (
                SerialNumber.trim().length === 18
                || SerialNumber.trim().length === 20
            );
    }

    /*  Determines if serial passed in is DecimalIMEISV
        returns true if string is Decimal IMEISV format */
    IsDecimalIMEISV(SerialNumber: string): boolean {
        const expression: RegExp = new RegExp(RegexExpressions.RegExp_DecimalSerialMask);
        return expression.test(SerialNumber)
            && SerialNumber.trim().length === 16;
    }

    private CalcLuhnDigit(str: string) {
        let sum = 0;
        const delta = [0, 1, 2, 3, 4, -4, -3, -2, -1, 0];
        for (let i = 0; i < str.length; i++) {
            sum = (sum + (str.charCodeAt(i) - 48));
        }
        for (let i = str.length - 1; i >= 0; i -= 2) {
            sum = (sum + delta[str.charCodeAt(i) - 48]);
        }
        let returnValue = 10 - sum % 10;
        if (returnValue === 10) {
            returnValue = 0;
        }
        return returnValue;
    }

    isPatternValid(serial: string, pattern: RegExp) {
        return pattern.test(serial);
    }

    private convertDecimalToHexDecimal(num: number) {
        return num.toString(16);
    }

    private convertHexDecimalToDecimal(str: string) {
        return parseInt(str, 16);
    }

    private convertDecimalToString(num: number) {
        return num.toString();
    }

    private convertIMEItoMEIDHex(serial: string) {
        return this.getSubstringOfSerial(serial, 0, 14);
    }

    private getSubstringOfSerial(serial: string, start: number, end?: number) {
        if (end) {
            return serial.substring(start, end);
        } else {
            return serial.substring(start);
        }
    }

    private getCombinedSerial(str1: string, str2: string) {
        return str1.concat(str2);
    }

    private convertMEIDDecToMeidHex(serial: string) {
        const mCode = parseInt(this.getSubstringOfSerial(serial, 0, 10));
        const manufacturerCode = serialPadding(8, this.convertDecimalToHexDecimal(mCode), '0');
        const mSerial = parseInt(this.getSubstringOfSerial(serial, 10));
        const manufacturerSerial = serialPadding(6, this.convertDecimalToHexDecimal(mSerial), '0');
        return manufacturerCode.concat(manufacturerSerial);
    }

    private convertMeidHexToMeidDec(serial: string) {
        const mCode = this.convertHexDecimalToDecimal(this.getSubstringOfSerial(serial, 0, 8))
        const manufacturerCode = serialPadding(10, this.convertDecimalToString(mCode), '0');
        const mSerial = this.convertHexDecimalToDecimal(this.getSubstringOfSerial(serial, 8))
        const manufacturerSerial = serialPadding(8, this.convertDecimalToString(mSerial), '0');
        return manufacturerCode.concat(manufacturerSerial);
    }

    private convertToMEIDDec(serial: string, serialNumberType: SerialNumberType) {
        let returnSerial = 'Invalid';
        switch (serialNumberType) {
            case SerialNumberType.DecimalIMEI:
                const getMEIDHex = this.convertIMEItoMEIDHex(serial);
                returnSerial = this.convertMeidHexToMeidDec(getMEIDHex);
                break;
            case SerialNumberType.HexMEID:
                returnSerial = this.convertMeidHexToMeidDec(serial);
                break;
            default:
                break;
        }
        return returnSerial;
    }

    private convertToMEIDHex(serial: string, serialNumberType: SerialNumberType) {
        let returnSerial = 'Invalid';
        switch (serialNumberType) {
            case SerialNumberType.DecimalIMEI:
                returnSerial = this.convertIMEItoMEIDHex(serial);
                break;
            case SerialNumberType.DecimalMEID:
                returnSerial = this.convertMEIDDecToMeidHex(serial);
                break;
            default:
                break;
        }
        return returnSerial;
    }

    private convertToImei(serial: string, serialNumberType: SerialNumberType) {
        let returnSerial = 'Invalid';
        switch (serialNumberType) {
            case SerialNumberType.HexMEID:
                returnSerial = this.getCombinedSerial(serial, this.convertDecimalToString(this.CalcLuhnDigit(serial)));
                break;
            case SerialNumberType.DecimalMEID:
                const getMeidHex = this.convertMEIDDecToMeidHex(serial);
                returnSerial = this.getCombinedSerial(getMeidHex, this.convertDecimalToString(this.CalcLuhnDigit(getMeidHex)));
                break;
            default:
                break;
        }
        return returnSerial;
    }

    /* Accepts serial, current Serial Type and target Serial Type */
    GetConvertedSerial(serialNumber: string, currentSerialNumberType: SerialNumberType, targetSerialNumberType: SerialNumberType): string {
        let returnValue = 'Invalid';
        switch (targetSerialNumberType) {
            case SerialNumberType.DecimalIMEI:
                returnValue = this.convertToImei(serialNumber, currentSerialNumberType);
                break;
            case SerialNumberType.DecimalMEID:
                returnValue = this.convertToMEIDDec(serialNumber, currentSerialNumberType);
                break;
            case SerialNumberType.HexMEID:
                returnValue = this.convertToMEIDHex(serialNumber, currentSerialNumberType);
                break;
            default:
                break;
        }
        return returnValue;
    }
}
