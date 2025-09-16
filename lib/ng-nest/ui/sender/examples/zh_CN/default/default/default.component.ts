import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { XSenderComponent } from '@ng-nest/ui/sender';

@Component({
  selector: 'ex-default',
  imports: [FormsModule, XSenderComponent],
  templateUrl: './default.component.html',
  styleUrl: './default.component.scss'
})
export class ExDefaultComponent {
  message = inject(XMessageService);
  loading = signal(false);
  disabled = signal(false);
 
  model1 = signal('');

  onSubmit() {
    this.loading.set(true);
    this.message.info(this.model1());
    setTimeout(() => {
      this.loading.set(false);
    }, 3000);
  }
}
