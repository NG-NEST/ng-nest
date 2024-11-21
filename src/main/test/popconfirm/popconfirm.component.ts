import { Component } from '@angular/core';
import { ExAsyncCloseComponent, ExConditionComponent, ExDefaultComponent } from '@ng-nest/ui/popconfirm/examples';

@Component({
  selector: 'te-popconfirm',
  imports: [ExAsyncCloseComponent, ExConditionComponent, ExDefaultComponent],
  templateUrl: './popconfirm.component.html'
})
export class TePopconfirmComponent {}
