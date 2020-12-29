import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsWelcomeComponent } from './grs-welcome.component';

describe('GrsWelcomeComponent', () => {
  let component: GrsWelcomeComponent;
  let fixture: ComponentFixture<GrsWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
