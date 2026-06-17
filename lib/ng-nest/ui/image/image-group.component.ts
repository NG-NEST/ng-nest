import { Component, ViewEncapsulation, ChangeDetectionStrategy, signal } from '@angular/core';
import { XImageGroupPrefix, XImageHandle } from './image.property';
import { X_IMAGE_GROUP_CONTEXT, XImageGroupContext } from './image-group.token';

@Component({
  selector: `${XImageGroupPrefix}`,
  templateUrl: './image-group.component.html',
  styleUrls: ['./image-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: X_IMAGE_GROUP_CONTEXT,
      useExisting: XImageGroupComponent
    }
  ]
})
export class XImageGroupComponent implements XImageGroupContext {
  images = signal<XImageHandle[]>([]);

  addImage(image: XImageHandle): void {
    this.images.update((x) => {
      x.push(image);
      return [...x];
    });
  }

  removeImage(image: XImageHandle): void {
    this.images.update((x) => {
      x.splice(x.indexOf(image), 1);
      return [...x];
    });
  }
}
