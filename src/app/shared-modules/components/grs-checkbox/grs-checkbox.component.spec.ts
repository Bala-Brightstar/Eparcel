import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsCheckboxComponent } from './grs-checkbox.component';

describe('GrsCheckboxComponent', () => {
  let component: GrsCheckboxComponent;
  let fixture: ComponentFixture<GrsCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
