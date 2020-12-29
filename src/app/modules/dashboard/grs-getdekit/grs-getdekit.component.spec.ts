import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GrsGetdekitComponent } from './grs-getdekit.component';
import { routes } from '../../dashboard/dashboard-meta-routers/dashboard-meta-routers-routing.module';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardComponent } from '../dashboard.component';
import { GrsWelcomeComponent } from '../grs-welcome/grs-welcome.component';
import { GrsDekitComponent } from '../grs-dekit/grs-dekit.component';
import { GrsAdminComponent } from '../grs-admin/grs-admin.component';
import { GrsInputComponent } from 'src/app/shared-modules/components/grs-input/grs-input.component';
import { MatFormFieldModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { GrsButtonComponent } from 'src/app/shared-modules/components/grs-button/grs-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthStateService } from 'src/app/core/authentication/Auth-state';
import { GrsDateUtility } from 'src/app/util/helpers/date-convertors/grs-date-convertors';
import { DekitAPIService } from 'src/app/services/graphql-services/dekit-service/dekit-api-service';
import { testGetDekitData, testTrackingNumber } from 'src/app/util/helpers/test-data/test-getDekit';
describe('GrsGetdekitComponent', () => {
  let component: GrsGetdekitComponent;
  let fixture: ComponentFixture<GrsGetdekitComponent>;
  let router: Router;
  let location: Location;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressBarModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        RouterTestingModule.withRoutes(routes)],
      declarations: [
        GrsGetdekitComponent,
        DashboardComponent,
        GrsWelcomeComponent,
        GrsDekitComponent,
        GrsAdminComponent,
        GrsInputComponent,
        GrsButtonComponent],
      providers: [AuthStateService, GrsDateUtility, DekitAPIService],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('Test if component instance created!', () => {
    fixture = TestBed.createComponent(GrsGetdekitComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('Test getDekit Header!', () => {
    const expectedHeaderValue = 'Get Dekit';
    fixture = TestBed.createComponent(GrsGetdekitComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toBe(expectedHeaderValue);
  });

  it('Test Router Navigation!', fakeAsync(() => {
    const expectedRouteNavigation = '/getdekit';
    router.initialNavigation();
    router.navigate(['getdekit']);
    tick();
    expect(location.path()).toBe(expectedRouteNavigation);
  }));

  it('Test if API has been called in getTrackingInfo method!', (() => {
    fixture = TestBed.createComponent(GrsGetdekitComponent);
    component = fixture.componentInstance;
    const fakeService = fixture.debugElement.injector.get(DekitAPIService);
    spyOn(fakeService, 'GetDekitInfo');
    const getTrackingInfo = component.getTrackingInfo();
    expect(fakeService.GetDekitInfo).toHaveBeenCalled();
  }));

  it('Test to display error message if getDekitData is null!', (async () => {
    const expectedErrorMessage = 'No matching data found';
    fixture = TestBed.createComponent(GrsGetdekitComponent);
    component = fixture.componentInstance;
    component.getDekitData = null;
    const populateData = await component.populateDekitData(component.getDekitData);
    expect(component.errorMessage).toBe(expectedErrorMessage);
  }));

  it('Test to display error message if getDekitData tracking Number attribute is null!', async () => {
    const expectedErrorMessage = 'No matching data found';
    fixture = TestBed.createComponent(GrsGetdekitComponent);
    component = fixture.componentInstance;
    component.getDekitData = testTrackingNumber;
    const populateData = await component.populateDekitData(component.getDekitData);
    expect(component.errorMessage).toBe(expectedErrorMessage);
  });

  it('Test to validate if data is populated as expected', async () => {
    const expectedErrorMessage = false;
    fixture = TestBed.createComponent(GrsGetdekitComponent);
    component = fixture.componentInstance;
    component.getDekitData = testGetDekitData;
    const populateData = await component.populateDekitData(component.getDekitData);
    expect(component.showDekitInfoError).toBe(expectedErrorMessage);
  });

  it('Test to validate if header item length is greater than 1', async () => {
    fixture = TestBed.createComponent(GrsGetdekitComponent);
    component = fixture.componentInstance;
    component.getDekitData = testGetDekitData;
    const populateData = await component.populateDekitData(component.getDekitData);
    expect(component.getDekitData.header.line.length).toBeGreaterThan(0);
  });

  it('Test to check if any of the form field is disabled!', async () => {
    fixture = TestBed.createComponent(GrsGetdekitComponent);
    component = fixture.componentInstance;
    component.getDekitData = testGetDekitData;
    const populateData = await component.populateDekitData(component.getDekitData);
    expect(component.getTrackingNumber.disabled).toBe(true);
  });

  it('Test to check if header item is null!', async () => {
    fixture = TestBed.createComponent(GrsGetdekitComponent);
    component = fixture.componentInstance;
    component.getDekitData = testTrackingNumber;
    const populateData = await component.populateDekitData(component.getDekitData);
    expect(component.getDekitData.header.line[0].item).toBeNull();
  });

  it('Test to check if customer ID not to be null!', async () => {
    fixture = TestBed.createComponent(GrsGetdekitComponent);
    component = fixture.componentInstance;
    component.getDekitData = testTrackingNumber;
    const populateData = await component.populateDekitData(component.getDekitData);
    expect(component.getDekitData.customerId).not.toBeNull();
  });
});
