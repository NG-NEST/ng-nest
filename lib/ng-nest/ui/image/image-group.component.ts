import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XImageComponent } from './image.component';
import { XImageGroupPrefix } from './image.property';

@Component({
  selector: `${XImageGroupPrefix}`,
  templateUrl: './image-group.component.html',
  styleUrls: ['./image-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XImageGroupComponent {
  images: XImageComponent[] = [];

  addImage(image: XImageComponent): void {
    this.images.push(image);
  }
}
