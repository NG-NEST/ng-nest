import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  ViewChild,
  inject,
  OnInit
} from '@angular/core';
import { XImageNode, XImagePreviewPrefix, XImagePreviewProperty } from './image.property';
import { XConfigService } from '@ng-nest/ui/core';
import { XDialogCloseDirective, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { CommonModule, DOCUMENT } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: `${XImagePreviewPrefix}`,
  standalone: true,
  imports: [CommonModule, XIconComponent, DragDropModule, XDialogCloseDirective],
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XImagePreviewComponent extends XImagePreviewProperty implements OnInit {
  imgScale3d = {
    x: 1,
    y: 1,
    z: 1
  };
  rotate = 0;

  position = {
    x: 0,
    y: 0
  };

  activated?: XImageNode;
  total = 1;
  current = 1;

  private document = inject(DOCUMENT);

  get getWrapperTransform() {
    return `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
  }
  get getImgTransform() {
    return `scale3d(${this.imgScale3d.x}, ${this.imgScale3d.y}, ${this.imgScale3d.z}) rotate(${this.rotate}deg)`;
  }

  @ViewChild('imageRef') imageRef!: ElementRef<HTMLImageElement>;

  data = inject<XImageNode[]>(X_DIALOG_DATA);
  configService = inject(XConfigService);

  ngOnInit() {
    this.setActivated();
  }

  initialization() {
    this.imgScale3d = {
      x: 1,
      y: 1,
      z: 1
    };
    this.rotate = 0;
    this.position = {
      x: 0,
      y: 0
    };
  }

  setActivated() {
    if (!this.data) return;
    if (this.data.length === 1) {
      this.activated = this.data[0];
      this.total = this.current = 1;
    } else {
      this.total = this.data.length;
      this.activated = this.data.find((x, index) => {
        if (x.activated) {
          this.current = index + 1;
          return true;
        }
        return false;
      });
    }
  }

  onCurrentChange(num: number) {
    this.current += num;
    this.activated = this.data[this.current - 1];
    this.initialization();
  }

  onRotate(deg: number) {
    this.rotate += deg;
  }

  onScale(zoom: number) {
    this.imgScale3d.x += zoom;
    this.imgScale3d.y += zoom;
  }

  onDragReleased() {
    let width = this.imageRef.nativeElement.offsetWidth * this.imgScale3d.x;
    let height = this.imageRef.nativeElement.offsetHeight * this.imgScale3d.x;
    const clientWidth = this.document.documentElement.clientWidth;
    const clientHeight =
      this.document.defaultView?.innerHeight || this.document.documentElement.clientHeight;
    const isRotate = this.rotate % 180 !== 0;
    const box = this.imageRef.nativeElement.getBoundingClientRect();
    const docElem = this.document.documentElement;
    const left =
      box.left +
      (this.document.defaultView?.pageXOffset || docElem.scrollLeft) -
      (docElem.clientLeft || this.document.body.clientLeft || 0);
    const top =
      box.top +
      (this.document.defaultView?.pageYOffset || docElem.scrollTop) -
      (docElem.clientTop || this.document.body.clientTop || 0);
    width = isRotate ? height : width;
    height = isRotate ? width : height;

    let position = { x: 0, y: 0 };
    if (width > clientWidth || height > clientHeight) {
      const x = this.fitPoint(left, width, clientWidth);
      const y = this.fitPoint(top, height, clientHeight);
      position.x = x ? x : 0;
      position.y = y ? y : 0;
    }

    this.position = { ...this.position, ...position };
  }

  fitPoint(start: number, size: number, clientSize: number): number | null {
    const startAddSize = start + size;
    const offsetStart = (size - clientSize) / 2;
    let distance: number | null = null;

    if (size > clientSize) {
      if (start > 0) {
        distance = offsetStart;
      }
      if (start < 0 && startAddSize < clientSize) {
        distance = -offsetStart;
      }
    } else {
      if (start < 0 || startAddSize > clientSize) {
        distance = start < 0 ? offsetStart : -offsetStart;
      }
    }

    return distance;
  }
}
