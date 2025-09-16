import { Component, inject, signal } from '@angular/core';
import { XSenderComponent } from '@ng-nest/ui/sender';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessageService } from '@ng-nest/ui/message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-actions',
  imports: [FormsModule, XSenderComponent, XButtonComponent],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss'
})
export class ExActionsComponent {
  loading = signal(false);
  disabled = signal(false);
  model1 = signal('Custom action button');
  message = inject(XMessageService);

  onSubmit() {
    this.loading.set(true);
    this.message.info(this.model1());
    setTimeout(() => {
      this.loading.set(false);
    }, 2000);
  }
}
