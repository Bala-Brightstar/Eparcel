import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatFormFieldModule, MatIconModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatSnackBar, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { GrsButtonComponent } from 'src/app/shared-modules/components/grs-button/grs-button.component';
import { GrsCheckboxComponent } from 'src/app/shared-modules/components/grs-checkbox/grs-checkbox.component';
import { GrsDropdownComponent } from 'src/app/shared-modules/components/grs-dropdown/grs-dropdown.component';
import { GrsGroupInputComponent } from 'src/app/shared-modules/components/grs-group-input/grs-group-input.component';
import { GrsInputComponent } from 'src/app/shared-modules/components/grs-input/grs-input.component';
import { GrsProgressBarComponent } from 'src/app/shared-modules/components/grs-progress-bar/grs-progress-bar.component';
import { GrsRadioComponent } from 'src/app/shared-modules/components/grs-radio/grs-radio.component';
import { GrsTextareaComponent } from 'src/app/shared-modules/components/grs-textarea/grs-textarea.component';
import { routes } from '../dashboard-meta-routers/dashboard-meta-routers-routing.module';
import { DashboardComponent } from '../dashboard.component';
import { GrsAdminComponent } from '../grs-admin/grs-admin.component';
import { GrsGetdekitComponent } from '../grs-getdekit/grs-getdekit.component';
import { GrsWelcomeComponent } from '../grs-welcome/grs-welcome.component';

import { GrsDekitComponent } from './grs-dekit.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { CreateDynamicFormControl } from 'src/app/util/helpers/create-custom-form-controls';
import { CustomFormValidators } from 'src/app/util/helpers/validations';
import { CreateReferenceNumber } from 'src/app/util/helpers/create-reference';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';
import { DekitAPIService } from 'src/app/services/graphql-services/dekit-service/dekit-api-service';
import { NgxSpinnerService } from 'ngx-spinner';


describe('GrsDekitComponent', () => {
  let component: GrsDekitComponent;
  let fixture: ComponentFixture<GrsDekitComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:      [
        CommonModule,
        ReactiveFormsModule,
        MatProgressBarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        FormsModule,
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        GrsGetdekitComponent,
        DashboardComponent,
        GrsWelcomeComponent,
        GrsDekitComponent,
        GrsAdminComponent,
        GrsInputComponent,
        GrsCheckboxComponent,
        GrsDropdownComponent,
        GrsGroupInputComponent,
        GrsProgressBarComponent,
        GrsRadioComponent,
        GrsTextareaComponent,
        GrsButtonComponent ],
        providers: [ CreateDynamicFormControl,
          CustomFormValidators, CreateReferenceNumber,
          AuthStateService, DekitAPIService, NgxSpinnerService, MatDialog],
        schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));


  it('should create GrsDekitComponent', () => {
    fixture = TestBed.createComponent(GrsDekitComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Test GrsDekitComponent Header!', () => {
    const expectedHeaderValue = 'Dekit';
    fixture = TestBed.createComponent(GrsDekitComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toBe(expectedHeaderValue);
  });

  it('GrsDekitComponent Test Router Navigation !', fakeAsync(() => {
    const expectedRouteNavigation = '/dekit';
    router.initialNavigation();
    router.navigate(['dekit']);
    tick();
    expect(location.path()).toBe(expectedRouteNavigation);
  }));

  it('Expecting if a attribute is dropdown', (async () => {
    const expectedError = false;
    fixture = TestBed.createComponent(GrsDekitComponent);
    component = fixture.componentInstance;
    const controlData = {
        attributeDataType: 'String',
        attributeDataTypeId: 1,
        attributeLength: 25,
        values: [
            {
                locationAttributeValueId: 3,
                value: 'Damaged Box'
            }
        ],
        attributeUIControlName: 'Drop Down',
        attributeName: 'BOX_COMPLIANCE',
        attributeMinValue: 11
    };
    const spy = spyOn(component, 'buildDropdownChanges').and.callThrough();
    const fakeProceed = component.proceedToBuildNextComponent(controlData);
    expect(spy).toHaveBeenCalled();
  }));

  it('In GetDekitTrackingInfo Test to display error message if tracking Number attribute is valid!', ( async () => {
    const expectedErrorMessage = ' Please check TrackingId.';
    fixture = TestBed.createComponent(GrsDekitComponent);
    component = fixture.componentInstance;
    const value = 'MNBVCXZ';
    expect( component.isTrackingInvalidInfo).toBe(expectedErrorMessage);
  }));

  it('Test if API has been called in createDekitRequest method!', ( async () => {
    const expectedErrorMessage = ' Please check TrackingId.';
    fixture = TestBed.createComponent(GrsDekitComponent);
    component = fixture.componentInstance;
    const fakeService = fixture.debugElement.injector.get(DekitAPIService);
    spyOn(fakeService, 'GetDekitTrackingInfo');
    const value = '12345678';
    expect( component.isTrackingInvalidInfo).toBe(expectedErrorMessage);
  }));


});
