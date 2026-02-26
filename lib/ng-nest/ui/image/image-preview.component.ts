import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  signal,
  computed,
  viewChild
} from '@angular/core';
import { XImageNode, XImagePreviewPrefix, XImagePreviewProperty } from './image.property';
import { XDialogCloseDirective, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { DOCUMENT } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: `${XImagePreviewPrefix}`,
  imports: [XIconComponent, DragDropModule, XDialogCloseDirective],
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XImagePreviewComponent extends XImagePreviewProperty implements OnInit {
  imgScale3d = signal({
    x: 1,
    y: 1,
    z: 1
  });
  rotate = signal(0);

  position = signal({
    x: 0,
    y: 0
  });

  activated = signal<XImageNode | undefined>(undefined);
  total = signal(1);
  current = signal(1);

  private document = inject(DOCUMENT);

  wrapperTransform = computed(() => {
    return `translate3d(${this.position().x}px, ${this.position().y}px, 0)`;
  });
  imgTransform = computed(() => {
    return `scale3d(${this.imgScale3d().x}, ${this.imgScale3d().y}, ${this.imgScale3d().z}) rotate(${this.rotate()}deg)`;
  });

  imageRef = viewChild.required<ElementRef<HTMLImageElement>>('imageRef');

  data = inject<XImageNode[]>(X_DIALOG_DATA);

  ngOnInit() {
    this.setActivated();
  }

  initialization() {
    this.imgScale3d.set({
      x: 1,
      y: 1,
      z: 1
    });
    this.rotate.set(0);
    this.position.set({
      x: 0,
      y: 0
    });
  }

  setActivated() {
    if (!this.data) return;
    if (this.data.length === 1) {
      this.activated.set(this.data[0]);
      this.total.set(1);
      this.current.set(1);
    } else {
      this.total.set(this.data.length);
      this.activated.set(
        this.data.find((x, index) => {
          if (x.activated) {
            this.current.set(index + 1);
            return true;
          }
          return false;
        })
      );
    }
  }

  onCurrentChange(num: number) {
    this.current.update((x) => x + num);
    this.activated.set(this.data[this.current() - 1]);
    this.initialization();
  }

  onRotate(deg: number) {
    this.rotate.update((x) => x + deg);
  }

  onScale(zoom: number) {
    const currentScale = this.imgScale3d().x;
    let newScale: number;
    
    if (zoom > 0) {
      // 放大：使用指数增长，但限制最大值
      newScale = Math.min(currentScale * 1.2, 5);
    } else {
      // 缩小：使用指数减少，但限制最小值
      newScale = Math.max(currentScale / 1.2, 0.1);
    }
    
    if (newScale !== currentScale) {
      this.imgScale3d.update((item) => {
        item.x = newScale;
        item.y = newScale;
        return { ...item };
      });
      // 缩放后重新计算位置，防止图片超出边界
      setTimeout(() => this.adjustPosition(), 0);
    }
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    event.stopPropagation();
    
    const delta = event.deltaY > 0 ? -1 : 1;
    this.onScale(delta);
  }

  onDragReleased() {
    this.adjustPosition();
  }

  private adjustPosition() {
    const img = this.imageRef().nativeElement;
    const scale = this.imgScale3d().x;
    const rotation = this.rotate() % 360;
    
    // 获取图片的原始尺寸
    const imgWidth = img.naturalWidth || img.offsetWidth;
    const imgHeight = img.naturalHeight || img.offsetHeight;
    
    // 计算缩放后的尺寸
    let scaledWidth = imgWidth * scale;
    let scaledHeight = imgHeight * scale;
    
    // 如果图片旋转了90度或270度，交换宽高
    const isRotated = Math.abs(rotation) === 90 || Math.abs(rotation) === 270;
    if (isRotated) {
      [scaledWidth, scaledHeight] = [scaledHeight, scaledWidth];
    }
    
    // 获取容器尺寸
    const containerWidth = this.document.documentElement.clientWidth;
    const containerHeight = this.document.documentElement.clientHeight;
    
    // 获取当前图片的位置
    const rect = img.getBoundingClientRect();
    const currentX = this.position().x;
    const currentY = this.position().y;
    
    // 计算图片中心点相对于容器中心的偏移
    const imgCenterX = rect.left + rect.width / 2;
    const imgCenterY = rect.top + rect.height / 2;
    const containerCenterX = containerWidth / 2;
    const containerCenterY = containerHeight / 2;
    
    let newX = currentX;
    let newY = currentY;
    
    // 如果图片比容器大，限制拖拽范围
    if (scaledWidth > containerWidth) {
      const maxOffsetX = (scaledWidth - containerWidth) / 2;
      const offsetX = imgCenterX - containerCenterX;
      
      if (offsetX > maxOffsetX) {
        newX = currentX - (offsetX - maxOffsetX);
      } else if (offsetX < -maxOffsetX) {
        newX = currentX - (offsetX + maxOffsetX);
      }
    } else {
      // 如果图片比容器小，居中显示
      newX = 0;
    }
    
    if (scaledHeight > containerHeight) {
      const maxOffsetY = (scaledHeight - containerHeight) / 2;
      const offsetY = imgCenterY - containerCenterY;
      
      if (offsetY > maxOffsetY) {
        newY = currentY - (offsetY - maxOffsetY);
      } else if (offsetY < -maxOffsetY) {
        newY = currentY - (offsetY + maxOffsetY);
      }
    } else {
      // 如果图片比容器小，居中显示
      newY = 0;
    }
    
    this.position.set({ x: newX, y: newY });
  }
}
