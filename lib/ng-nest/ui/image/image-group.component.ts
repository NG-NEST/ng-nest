import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XImageComponent } from './image.component';
import { XImageGroupPrefix } from './image.property';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XImageGroupPrefix}`,
  standalone: true,
  imports: [CommonModule],
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

  removeImage(image: XImageComponent): void {
    this.images.splice(this.images.indexOf(image), 1);
  }
}
