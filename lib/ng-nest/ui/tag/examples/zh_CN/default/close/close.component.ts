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
  tags = signal(['标签一', '标签二', '标签三', '标签四', '标签五']);
  close(tag: string) {
    this.tags.update((x) => {
      x.splice(x.indexOf(tag), 1);
      return [...x];
    });
  }
}
