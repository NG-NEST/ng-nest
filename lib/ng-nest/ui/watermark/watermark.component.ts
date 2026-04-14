import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  computed,
  signal,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { XWatermarkProperty, XWatermarkPrefix } from './watermark.property';

@Component({
  selector: XWatermarkPrefix,
  imports: [],
  templateUrl: './watermark.component.html',
  styleUrls: ['./watermark.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XWatermarkComponent extends XWatermarkProperty implements AfterViewInit, OnDestroy {
  backgroundImage = signal<string>('');

  private font = computed(() => {
    return `${this.fontSize()}px ${this.fontFamily()}`;
  });

  private textWidth = computed(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = this.font();
      return ctx.measureText(this.content()).width;
    }
    return this.width();
  });

  watermarkWidth = computed(() => {
    const imgW = this.imageSrc() && this.imageWidth() ? this.imageWidth() : this.textWidth();
    return Math.max(imgW, this.textWidth()) + this.gapX();
  });
  
  watermarkHeight = computed(() => {
    const imgH = this.imageSrc() && this.imageHeight() ? this.imageHeight() : this.height();
    return Math.max(imgH, this.height()) + this.gapY();
  });

  constructor() {
    super();
  }

  ngAfterViewInit() {
    this.createWatermark();
  }

  ngOnDestroy() {}

  private createWatermark() {
    if (this.imageSrc()) {
      this.drawWatermarkWithImage();
    } else {
      this.drawWatermarkText();
    }
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  private async drawWatermarkWithImage() {
    const w = this.watermarkWidth();
    const h = this.watermarkHeight();
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const img = await this.loadImage(this.imageSrc());
      const imgW = this.imageWidth() || this.width();
      const imgH = this.imageHeight() || this.height();
      
      ctx.save();
      ctx.rotate((this.rotate() * Math.PI) / 180);
      ctx.globalAlpha = this.alpha();
      
      // 绘制图片
      const imgX = (w - imgW) / 2;
      const imgY = (h - imgH) / 2;
      ctx.drawImage(img, imgX, imgY, imgW, imgH);
      
      // 绘制文本
      if (this.content()) {
        ctx.font = this.font();
        ctx.fillStyle = this.color();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        let textY = h / 2;
        if (this.imagePosition() === 'top') {
          textY = imgY - 10;
        } else if (this.imagePosition() === 'bottom') {
          textY = imgY + imgH + 10;
        }
        
        ctx.fillText(this.content(), w / 2, textY);
      }
      
      ctx.restore();
      this.backgroundImage.set(canvas.toDataURL());
    } catch {
      // 图片加载失败，降级为纯文本
      this.drawWatermarkText();
    }
  }

  private drawWatermarkText() {
    const w = this.watermarkWidth();
    const h = this.watermarkHeight();

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.rotate((this.rotate() * Math.PI) / 180);
    ctx.font = this.font();
    ctx.fillStyle = this.color();
    ctx.globalAlpha = this.alpha();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.content(), w / 2, h / 2);
    ctx.restore();

    const dataUrl = canvas.toDataURL();
    this.backgroundImage.set(dataUrl);
  }
}
