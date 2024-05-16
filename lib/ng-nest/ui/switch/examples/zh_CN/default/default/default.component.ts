import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [FormsModule, XSwitchComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  model = signal(true);
}
