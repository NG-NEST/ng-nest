import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessageService } from '@ng-nest/ui/message';
import { XPopconfirmComponent } from '@ng-nest/ui/popconfirm';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'ex-condition',
  standalone: true,
  imports: [FormsModule, XPopconfirmComponent, XButtonComponent, XSwitchComponent],
  templateUrl: './condition.component.html'
})
export class ExConditionComponent {
  constructor(private message: XMessageService) {}
  condition = true;
  confirm() {
    this.message.info('Condition!');
  }
  cancel() {}
}
