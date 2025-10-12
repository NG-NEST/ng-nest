import { Component, inject, signal } from '@angular/core';
import { XSenderComponent, XSenderStopComponent } from '@ng-nest/ui/sender';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XMessageService } from '@ng-nest/ui/message';
import { FormsModule } from '@angular/forms';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { XAttachmentsComponent } from "@ng-nest/ui/attachments";

@Component({
  selector: 'ex-header',
  imports: [FormsModule, XSwitchComponent, XSenderComponent, XButtonComponent, XSenderStopComponent, XAttachmentsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class ExHeaderComponent {
  loading = signal(false);
  disabled = signal(false);
  model1 = signal('Header and footer template');
  model2 = signal('Click to show header template');
  showHeader = signal(false);
  message = inject(XMessageService);

  onSubmit() {
    this.loading.set(true);
    this.message.info(this.model1());
    setTimeout(() => {
      this.loading.set(false);
    }, 2000);
  }

  onShowHeader() {
    this.showHeader.update((x) => !x);
  }
}
