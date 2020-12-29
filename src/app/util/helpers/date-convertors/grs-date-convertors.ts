import { Injectable } from '@angular/core';
import moment from 'moment';


@Injectable()
export class GrsDateUtility {

    DEFAULT_DATE_PATTERN = 'MM-DD-YYYY';

    converStringToDate( stringiFiedDate: string, dateFormat?: string ) {
        if(dateFormat !== undefined) {
            this.DEFAULT_DATE_PATTERN = dateFormat;
        }
        return moment(stringiFiedDate).format(this.DEFAULT_DATE_PATTERN);
    }
}