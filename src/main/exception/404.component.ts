import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'exception-404',
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Exception404Component {
  back() {
    window.history.back();
  }
}
