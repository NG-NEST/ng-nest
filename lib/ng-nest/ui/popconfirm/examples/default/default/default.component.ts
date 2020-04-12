import { Component } from '@angular/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html'
})
export class ExDefaultComponent {
  confirm() {
    console.log('confirm');
  }
  cancel() {
    console.log('cancel');
  }
}
