import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsRadioOldComponent } from './grs-radio-old.component';

describe('GrsRadioOldComponent', () => {
  let component: GrsRadioOldComponent;
  let fixture: ComponentFixture<GrsRadioOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsRadioOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsRadioOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
