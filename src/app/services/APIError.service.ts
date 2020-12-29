import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class APIErrorService {

  private apiErrorSource = new Subject<any>();

  apiError$ = this.apiErrorSource.asObservable();

  announceAPIError(apiError: any) {
    this.apiErrorSource.next(apiError);
  }

}