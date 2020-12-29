import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsAlertsComponent } from './grs-alerts.component';

describe('GrsAlertsComponent', () => {
  let component: GrsAlertsComponent;
  let fixture: ComponentFixture<GrsAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
