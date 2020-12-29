import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsGroupInputComponent } from './grs-group-input.component';

describe('GrsGroupInputComponent', () => {
  let component: GrsGroupInputComponent;
  let fixture: ComponentFixture<GrsGroupInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsGroupInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsGroupInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
