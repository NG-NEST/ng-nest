import { DOCUMENT } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';

@Component({
  selector: 'exception-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Exception404Component {
  document = inject(DOCUMENT);

  back() {
    this.document.defaultView?.history.back();
  }
}
