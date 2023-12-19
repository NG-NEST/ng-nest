import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
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
  images: XImageComponent[] = [];

  constructor() {
    console.log('group cons');
  }

  ngOnInit() {
    console.log('group');
  }

  addImage(image: XImageComponent): void {
    console.log('add');
    this.images.push(image);
  }

  removeImage(image: XImageComponent): void {
    console.log('remove');
    this.images.splice(this.images.indexOf(image), 1);
  }
}
