import { Component, signal } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XPopoverDirective } from '@ng-nest/ui/popover';
import { interval } from 'rxjs';

@Component({
  selector: 'ex-default',
  standalone: true,
  imports: [XPopoverDirective, XButtonComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent {
  content = signal(123);

  constructor() {
    interval(1000).subscribe(() => {
      this.content.update((x) => x + 1);
    });
  }
}
