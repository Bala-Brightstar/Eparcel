import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsInputComponent } from './grs-input.component';

describe('GrsInputComponent', () => {
  let component: GrsInputComponent;
  let fixture: ComponentFixture<GrsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
