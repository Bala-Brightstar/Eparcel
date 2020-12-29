import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsDropdownOldComponent } from './grs-dropdown-old.component';

describe('GrsDropdownOldComponent', () => {
  let component: GrsDropdownOldComponent;
  let fixture: ComponentFixture<GrsDropdownOldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsDropdownOldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsDropdownOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
