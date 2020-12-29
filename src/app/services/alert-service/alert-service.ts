import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export enum BootstrapAlerts {
    PRIMARY = 'alert-primary',
    SECONDARY = 'alert-secondary',
    SUCCESS = 'alert-success',
    DANGER = 'alert-danger',
    WARNING = 'alert-warning',
    INFO = 'alert-info',
    LIGHT = 'alert-light',
    DARK = 'alert-dark',
    DEFAULT = 'alert-primary'
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private setAlert = new BehaviorSubject<BootstrapAlerts>(BootstrapAlerts.DEFAULT);
    getAlert$ = this.setAlert.asObservable();

    private setIsShowMessage = new BehaviorSubject<boolean>(false);
    isShowMessage$ = this.setIsShowMessage.asObservable();

    private setErrorMsg = new BehaviorSubject<boolean>(false);
    isErrorMessage$ = this.setErrorMsg.asObservable();

    private setMessage = new BehaviorSubject<string>(null);
    getMessage$ = this.setMessage.asObservable();

    setAlertTheme(alert: BootstrapAlerts) {
        this.setAlert.next(alert);
    }

    isShowMessage(bool: boolean) {
        this.setIsShowMessage.next(bool);
    }

    isErrorMessage(bool: boolean) {
        this.setErrorMsg.next(bool);
    }

    message(msg: string) {
        this.setMessage.next(msg);
    }

    get showMessageStatus() {
        return this.isShowMessage$
    }

    async showMessageToUser(message: string, alertType: BootstrapAlerts, isShowMessage: boolean, isErrorMessage: boolean, timeOut?: number) {
        this.message(message);
        this.isShowMessage(isShowMessage);
        this.isErrorMessage(isErrorMessage);
        this.setAlertTheme(alertType);
        setTimeout(() => {
            this.isShowMessage(false);
            this.message(message);
        }, 7000)
    }

}