import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsAdminComponent } from './grs-admin.component';

describe('GrsAdminComponent', () => {
  let component: GrsAdminComponent;
  let fixture: ComponentFixture<GrsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
