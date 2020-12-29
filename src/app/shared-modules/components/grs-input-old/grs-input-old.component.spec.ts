import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsInputOldComponent } from './grs-input-old.component';

describe('GrsInputOldComponent', () => {
  let component: GrsInputOldComponent;
  let fixture: ComponentFixture<GrsInputOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsInputOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsInputOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
