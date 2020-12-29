import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsTextareaComponent } from './grs-textarea.component';

describe('GrsTextareaComponent', () => {
  let component: GrsTextareaComponent;
  let fixture: ComponentFixture<GrsTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
