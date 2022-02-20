import { Component } from '@angular/core';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'ex-condition',
  templateUrl: './condition.component.html'
})
export class ExConditionComponent {
  constructor(private message: XMessageService) {}
  condition = true;
  confirm() {
    this.message.info('条件触发');
  }
  cancel() {}
}
