import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { MenuComponent } from '../app/modules/dashboard/menu/menu.component';
import {routes} from './app-routing.module';
import { Location } from '@angular/common';
import { AuthComponent } from './modules/auth/auth.component';
describe('AppComponent', () => {

  let router: Router;
  let location: Location;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MenuComponent,
        AuthComponent
      ],
      imports: [
        RouterTestingModule,
        NgxSpinnerModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        RouterTestingModule.withRoutes(routes)
      ]
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render Menu component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-menu')).not.toBeNull();
  });

  it('should contain router outlet for navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('Test Router Navigation!', fakeAsync(() => {
    const expectedRouteNavigation = '/grs/login';
    router.initialNavigation();
    router.navigate(['grs/login']);
    tick();
    expect(location.path()).toBe(expectedRouteNavigation);
  }));

});
