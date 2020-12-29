import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsProgressBarComponent } from './grs-progress-bar.component';

describe('GrsProgressBarComponent', () => {
  let component: GrsProgressBarComponent;
  let fixture: ComponentFixture<GrsProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
