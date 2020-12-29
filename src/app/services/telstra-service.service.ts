import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TelstraServiceService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  getReceiptdata(){
    let API_URL = 'https://5akepgqw33.execute-api.ap-southeast-2.amazonaws.com/Dev/gbp-telstra';
    return this.http.get(API_URL)
      .pipe(
        catchError(this.error)
      )
  }

  postReceiptData(data){
    let API_URL = 'https://5akepgqw33.execute-api.ap-southeast-2.amazonaws.com/Dev/gbp-telstra';
    // const data ={
    //     'consignmentId':consignment,
    //     'articleId':articleID,
    //     'status':status
    // }
    return this.http.post(API_URL,data)
      .pipe(
        catchError(this.error)
      )
  }

    // Handle Errors
    error(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}
