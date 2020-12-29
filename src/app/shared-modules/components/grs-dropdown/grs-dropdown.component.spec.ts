import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsDropdownComponent } from './grs-dropdown.component';

describe('GrsDropdownComponent', () => {
  let component: GrsDropdownComponent;
  let fixture: ComponentFixture<GrsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
