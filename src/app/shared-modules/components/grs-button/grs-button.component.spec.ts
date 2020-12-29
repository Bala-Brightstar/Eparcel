import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsButtonComponent } from './grs-button.component';

describe('GrsButtonComponent', () => {
  let component: GrsButtonComponent;
  let fixture: ComponentFixture<GrsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
