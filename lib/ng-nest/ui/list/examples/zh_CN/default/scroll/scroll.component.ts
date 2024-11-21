import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XSize } from '@ng-nest/ui/core';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { XListComponent } from '@ng-nest/ui/list';
import { XRadioComponent } from '@ng-nest/ui/radio';

@Component({
  selector: 'ex-scroll',
  imports: [FormsModule, XListComponent, XRadioComponent, XInputNumberComponent],
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ExScrollComponent {
  radioData = signal(['big', 'large', 'medium', 'small', 'mini']);
  size = signal<XSize>('medium');
  visible = signal(false);
  scrollHeight = signal(250);
  data = signal(Array.from({ length: 1000 }).map((_, index) => `item ${index + 1}`));
}
