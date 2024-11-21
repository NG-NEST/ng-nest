import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPopconfirmComponent } from '@ng-nest/ui/popconfirm';

@Component({
  selector: 'ex-default',
  imports: [XPopconfirmComponent, XButtonComponent],
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
