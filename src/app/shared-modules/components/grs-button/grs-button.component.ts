import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-grs-button',
  templateUrl: './grs-button.component.html',
  styleUrls: ['./grs-button.component.scss']
})
export class GrsButtonComponent implements OnInit {
  @Input()
  applyDynamicClass = 'default';

  @Input()
  applyDynamicColor = '#cf102d';

  @Input()
  performEventOnInit = false;

  @Output()
  sendEvent = new EventEmitter();

  @Input()
  isButtonDisabled = false;

  constructor() { }

  ngOnInit() {
    if (this.performEventOnInit) {
      this.sendEvent.emit();
    }
  }

}
