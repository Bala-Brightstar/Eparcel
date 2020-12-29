import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsFormArrayInputsComponent } from './grs-form-array-inputs.component';

describe('GrsFormArrayInputsComponent', () => {
  let component: GrsFormArrayInputsComponent;
  let fixture: ComponentFixture<GrsFormArrayInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsFormArrayInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsFormArrayInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
