import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsRadioComponent } from './grs-radio.component';

describe('GrsRadioComponent', () => {
  let component: GrsRadioComponent;
  let fixture: ComponentFixture<GrsRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
