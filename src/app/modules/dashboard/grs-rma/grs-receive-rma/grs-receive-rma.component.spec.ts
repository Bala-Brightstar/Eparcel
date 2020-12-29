import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatProgressBarModule, MatIconModule, MatProgressSpinnerModule,
  MatFormFieldModule, MatSnackBarModule, MatSnackBar
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { DekitAPIService } from 'src/app/services/graphql-services/dekit-service/dekit-api-service';
import { GrsButtonComponent } from 'src/app/shared-modules/components/grs-button/grs-button.component';
import { GrsInputComponent } from 'src/app/shared-modules/components/grs-input/grs-input.component';
import { routes } from '../../dashboard-meta-routers/dashboard-meta-routers-routing.module';
import { DashboardComponent } from '../../dashboard.component';
import { GrsAdminComponent } from '../../grs-admin/grs-admin.component';
import { GrsDekitComponent } from '../../grs-dekit/grs-dekit.component';
import { GrsGetdekitComponent } from '../../grs-getdekit/grs-getdekit.component';
import { GrsWelcomeComponent } from '../../grs-welcome/grs-welcome.component';
import { GrsGetRmaComponent } from '../grs-get-rma/grs-get-rma.component';

import { GrsReceiveRmaComponent } from './grs-receive-rma.component';
import { SerialNumberHelper } from 'src/app/util/helpers/serial-format/serial-formats';
import { of } from 'rxjs';

describe('GrsReceiveRmaComponent', () => {
  let component: GrsReceiveRmaComponent;
  let fixture: ComponentFixture<GrsReceiveRmaComponent>;

  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressBarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        FormsModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        RouterTestingModule.withRoutes(routes)],
      declarations: [
        GrsGetRmaComponent,
        GrsReceiveRmaComponent,
        GrsGetdekitComponent,
        GrsInputComponent,
        GrsButtonComponent,
        DashboardComponent,
        GrsWelcomeComponent,
        GrsDekitComponent,
        GrsAdminComponent
      ],
      providers: [DekitAPIService, MatSnackBar],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);

  }));

  it('Test if GrsReceive instance created!', () => {
    fixture = TestBed.createComponent(GrsReceiveRmaComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Test Router Navigation!', fakeAsync(() => {
    const expectedRouteNavigation = '/receiverma';
    router.initialNavigation();
    router.navigate(['receiverma']);
    tick();
    expect(location.path()).toBe(expectedRouteNavigation);
  }));

  it('Test if serial format is DecimalESN', () => {
    const expectedValue = 1;
    const input = '99999999999';
    const serialNumberFinder: SerialNumberHelper = new SerialNumberHelper();
    expect(serialNumberFinder.GetSerialFormat(input)).toBe(expectedValue);
  });

  it('Test if serial format is IsDecimalIMEI', () => {
    const expectedValue = 5;
    const input = '9999999999999';
    const serialNumberFinder: SerialNumberHelper = new SerialNumberHelper();
    expect(serialNumberFinder.GetSerialFormat(input)).toBe(expectedValue);
  });

  it('Test if serial format is IsHexMEID', () => {
    const expectedValue = 4;
    const input = '9999999999999F';
    const serialNumberFinder: SerialNumberHelper = new SerialNumberHelper();
    expect(serialNumberFinder.GetSerialFormat(input)).toBe(expectedValue);
  });

  it('Test if serial format is IsDecimalIMEISV', () => {
    const expectedValue = 6;
    const input = '9999999999999999';
    const serialNumberFinder: SerialNumberHelper = new SerialNumberHelper();
    expect(serialNumberFinder.GetSerialFormat(input)).toBe(expectedValue);
  });

  it('Test Invalid Serial Format', () => {
    const input = '99999999';
    const serialNumberFinder: SerialNumberHelper = new SerialNumberHelper();
    expect(serialNumberFinder.GetSerialFormat(input)).toBe(-1);
  });

  it('Test if serial format from the api call is valid', async () => {
    const response = {
      customerId: '183347',
      rmaNumber: 'RA20000000004',
      rmaOrderId: 1,
      items: [
        {
          imei: '99999999999',
        }
      ]
    }
    fixture = TestBed.createComponent(GrsReceiveRmaComponent);
    component = fixture.componentInstance;
    component.buildRmaForm();
    component.serialNumber.setValue('IMEI-999');
    const spy = await spyOn(component, 'getRMABySerialDataFunc').and.returnValue(Promise.resolve(response));
    component.getRMABySerialNo();
    expect(spy).toHaveBeenCalled();
    const expectedValue = 1;
    const serialNumberFinder: SerialNumberHelper = new SerialNumberHelper();
    expect(serialNumberFinder.GetSerialFormat(response.items[0].imei)).toBe(expectedValue);
  });


});

