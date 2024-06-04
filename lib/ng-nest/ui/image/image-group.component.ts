import { Component, ViewEncapsulation, ChangeDetectionStrategy, signal } from '@angular/core';
import { XImageComponent } from './image.component';
import { XImageGroupPrefix } from './image.property';

@Component({
  selector: `${XImageGroupPrefix}`,
  standalone: true,
  templateUrl: './image-group.component.html',
  styleUrls: ['./image-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XImageGroupComponent {
  images = signal<XImageComponent[]>([]);

  addImage(image: XImageComponent): void {
    this.images.update((x) => {
      x.push(image);
      return [...x];
    });
  }

  removeImage(image: XImageComponent): void {
    this.images.update((x) => {
      x.splice(x.indexOf(image), 1);
      return [...x];
    });
  }
}
