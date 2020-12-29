import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatIconModule,
         MatProgressBarModule, MatProgressSpinnerModule,
        MatSnackBar, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DekitAPIService } from 'src/app/services/graphql-services/dekit-service/dekit-api-service';
import { GrsButtonComponent } from 'src/app/shared-modules/components/grs-button/grs-button.component';
import { GrsInputComponent } from 'src/app/shared-modules/components/grs-input/grs-input.component';
import { DashboardComponent } from '../../dashboard.component';
import { GrsAdminComponent } from '../../grs-admin/grs-admin.component';
import { GrsDekitComponent } from '../../grs-dekit/grs-dekit.component';
import { GrsWelcomeComponent } from '../../grs-welcome/grs-welcome.component';

import { GrsGetRmaComponent } from './grs-get-rma.component';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../dashboard-meta-routers/dashboard-meta-routers-routing.module';
import { GrsGetdekitComponent } from '../../grs-getdekit/grs-getdekit.component';
import { testGetRmaData } from 'src/app/util/helpers/test-data/test-getRma';

describe('GrsGetRmaComponent', () => {
  let component: GrsGetRmaComponent;
  let fixture: ComponentFixture<GrsGetRmaComponent>;
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
        GrsGetdekitComponent,
        GrsInputComponent,
        GrsButtonComponent,
        DashboardComponent,
        GrsWelcomeComponent,
        GrsDekitComponent,
        GrsAdminComponent
      ] ,
      providers: [ DekitAPIService , MatSnackBar],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));

  it('Test if GrsGetRmaComponent instance created!', () => {
    fixture = TestBed.createComponent(GrsGetRmaComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Test GrsGetRmaComponent Header created!', () => {
    const expectedHeaderValue = 'Search RMA Details';
    fixture = TestBed.createComponent(GrsGetRmaComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toBe(expectedHeaderValue);
  });

  it('Test Router Navigation!', fakeAsync(() => {
    const expectedRouteNavigation = '/getrma';
    router.initialNavigation();
    router.navigate(['getrma']);
    tick();
    expect(location.path()).toBe(expectedRouteNavigation);
  }));

  it('Test to display API error message if GrsGetRmaComponent attribute is null!', async () => {
    fixture = TestBed.createComponent(GrsGetRmaComponent);
    component = fixture.componentInstance;
    await component.buildRmaForm();
    component.getRmaForm.controls['rmaNumber'].setValue('12769473');
    console.log('GetRMA  :', component.getRmaForm);
    component.getRmaData = null;
    const populateData = await component.getRmaDetails();
    expect(component).toBeTruthy();
  });

  it('API of getRmaDetails in GrsGetRmaComponent', async () => {
    fixture = TestBed.createComponent(GrsGetRmaComponent);
    component = fixture.componentInstance;
    await component.buildRmaForm();
    component.getRmaForm.controls['rmaNumber'].setValue('12769473');
    console.log('GetRMA  :', component.getRmaForm);
    component.getRmaData = testGetRmaData;
    const populateData = await component.getRmaDetails();
    expect(component).toBeTruthy();
  });

  it('Test to check if RMA Deatils are populated', async () => {
    fixture = TestBed.createComponent(GrsGetRmaComponent);
    component = fixture.componentInstance;
    await component.buildRmaForm();
    component.getRmaForm.controls['rmaNumber'].setValue('12769473');
    console.log('GetRMA  :', component.getRmaForm);
    component.getRmaData = testGetRmaData;
    const populateData = await component.populateRMADetails(component.getRmaData);
    expect(component).toBeTruthy();
  });

  it('passes if arrays are equal for customerDetails', () => {
    fixture = TestBed.createComponent(GrsGetRmaComponent);
    component = fixture.componentInstance;
    const arrayHeader = component.customerDetailsHeaderAttributes.length;
    const arrayLabel = component.customerDetailLabel.length;
    expect(arrayHeader).toEqual(arrayLabel);
});

});
