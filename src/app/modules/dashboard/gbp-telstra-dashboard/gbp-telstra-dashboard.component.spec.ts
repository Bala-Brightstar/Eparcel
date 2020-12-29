import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GbpTelstraDashboardComponent } from './gbp-telstra-dashboard.component';

describe('GbpTelstraDashboardComponent', () => {
  let component: GbpTelstraDashboardComponent;
  let fixture: ComponentFixture<GbpTelstraDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GbpTelstraDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GbpTelstraDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
