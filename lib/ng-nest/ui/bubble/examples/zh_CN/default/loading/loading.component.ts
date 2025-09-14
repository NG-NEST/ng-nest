import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XBubbleComponent } from '@ng-nest/ui/bubble';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'ex-loading',
  imports: [FormsModule, XBubbleComponent, XSwitchComponent],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class ExLoadingComponent {
  loading = signal(true);
}
