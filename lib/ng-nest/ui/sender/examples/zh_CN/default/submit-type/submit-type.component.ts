import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { XSenderComponent } from '@ng-nest/ui/sender';

@Component({
  selector: 'ex-submit-type',
  imports: [FormsModule, XSenderComponent],
  templateUrl: './submit-type.component.html',
  styleUrl: './submit-type.component.scss'
})
export class ExSubmitTypeComponent {
  message = inject(XMessageService);

  model1 = signal('');
  model2 = signal('');

  onSubmit(value: string) {
    this.message.info(value);
  }
}
