import { Component, signal } from '@angular/core';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'ex-close',
  standalone: true,
  imports: [XTagComponent],
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class ExCloseComponent {
  tags = signal(['Label One', 'Label Two', 'Label Three', 'Label Four', 'Label Five']);
  close(tag: string) {
    this.tags.update((x) => {
      x.splice(x.indexOf(tag), 1);
      return [...x];
    });
  }
}
