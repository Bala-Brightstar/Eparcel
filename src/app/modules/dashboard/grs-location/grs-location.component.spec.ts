import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsLocationComponent } from './grs-location.component';

describe('GrsLocationComponent', () => {
  let component: GrsLocationComponent;
  let fixture: ComponentFixture<GrsLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
