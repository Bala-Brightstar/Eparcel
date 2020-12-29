import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsAutoCompleteComponent } from './grs-auto-complete.component';

describe('GrsAutoCompleteComponent', () => {
  let component: GrsAutoCompleteComponent;
  let fixture: ComponentFixture<GrsAutoCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsAutoCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
