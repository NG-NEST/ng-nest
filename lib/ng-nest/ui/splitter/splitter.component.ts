import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  computed,
  contentChildren,
  AfterContentInit,
  ElementRef,
  inject,
  ChangeDetectorRef
} from '@angular/core';
import { XSplitterPrefix, XSplitterProperty } from './splitter.property';
import { XSplitterPanelComponent } from './splitter-panel.component';
import { XSplitterBarComponent } from './splitter-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XSplitterPrefix}`,
  imports: [CommonModule],
  templateUrl: './splitter.component.html',
  styleUrls: ['./splitter.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSplitterComponent extends XSplitterProperty implements AfterContentInit {
  panels = contentChildren(XSplitterPanelComponent);
  bars = contentChildren(XSplitterBarComponent);
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);

  // 缓存 splitter 的尺寸信息，避免频繁调用 getBoundingClientRect
  private cachedSplitterRect: DOMRect | null = null;
  private cachedBarSize: number | null = null;

  // 用于 requestAnimationFrame 的 ID，避免重复调度
  private rafId: number | null = null;

  /**
   * @zh_CN 类名映射
   * @en_US Class map
   */
  classMap = computed(() => ({
    [`${XSplitterPrefix}-${this.direction()}`]: true
  }));

  ngAfterContentInit() {
    this.initBars();
    this.initPanelSizes();
  }

  private initPanelSizes() {
    const panels = this.panels();

    panels.forEach((panel) => {
      const size = panel.size();
      if (size !== undefined && size !== null) {
        // 直接使用原始尺寸值，不转换
        panel.currentSize.set(size);
      }
    });
  }

  private initBars() {
    const barComponents = this.bars();
    barComponents.forEach((bar, index) => {
      bar.dragStart.subscribe(() => this.onDragStart(index));
      bar.dragging.subscribe((event) => this.onDragging(index, event));
      bar.dragEnd.subscribe(() => this.onDragEnd(index));
    });
  }

  private onDragStart(_barIndex: number) {
    // 缓存 splitter 的尺寸和 bar 的大小，避免在拖动过程中重复计算
    this.cachedSplitterRect = this.elementRef.nativeElement.getBoundingClientRect();
    this.cachedBarSize = this.getBarSize();
  }

  private onDragging(barIndex: number, event: MouseEvent) {
    // 取消之前的动画帧请求，避免累积
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }

    // 使用 requestAnimationFrame 确保在下一帧更新，避免闪动
    this.rafId = requestAnimationFrame(() => {
      this.rafId = null;
      this.updatePanelSizes(barIndex, event);
    });
  }

  private updatePanelSizes(barIndex: number, event: MouseEvent) {
    const panelElements = this.elementRef.nativeElement.querySelectorAll('x-splitter-panel');
    if (panelElements.length < 2) return;

    // 获取 panel 组件实例
    const panels = this.panels();
    if (panels.length < 2) return;

    const prevPanel = panels[barIndex];
    const nextPanel = panels[barIndex + 1];

    if (!prevPanel || !nextPanel) return;

    // 使用缓存的尺寸信息，提高性能
    const splitterRect = this.cachedSplitterRect || this.elementRef.nativeElement.getBoundingClientRect();
    const isHorizontal = this.direction() === 'horizontal';

    // 获取鼠标位置相对于 splitter 的位置
    const position = isHorizontal ? event.clientX - splitterRect.left : event.clientY - splitterRect.top;

    // 获取 splitter 的总尺寸
    const totalSize = isHorizontal ? splitterRect.width : splitterRect.height;

    // 计算前一个面板的新尺寸（像素）
    let newSizePx = position;

    // 应用最小和最大限制（转换为像素）
    const minSizePx = this.parseSizeToPx(prevPanel.min(), totalSize);
    const maxSizePx = this.parseSizeToPx(prevPanel.max(), totalSize);
    newSizePx = Math.max(minSizePx, Math.min(maxSizePx, newSizePx));

    // 确保后一个面板也有最小限制
    const remainingPx = totalSize - newSizePx;
    const nextMinSizePx = this.parseSizeToPx(nextPanel.min(), totalSize);
    const nextMaxSizePx = this.parseSizeToPx(nextPanel.max(), totalSize);

    if (remainingPx < nextMinSizePx) {
      newSizePx = totalSize - nextMinSizePx;
    } else if (remainingPx > nextMaxSizePx) {
      newSizePx = totalSize - nextMaxSizePx;
    }

    // 确保不会把 bar 挤出可见区域
    // bar 需要占据一定的空间，所以要为 bar 预留空间
    const barSize = this.cachedBarSize || this.getBarSize();
    // 前一个面板 + bar + 后一个面板 <= totalSize
    // 所以：newSizePx + barSize + nextMinSizePx <= totalSize
    if (newSizePx + barSize + nextMinSizePx > totalSize) {
      newSizePx = totalSize - barSize - nextMinSizePx;
    }
    // 同时确保前一个面板不小于其最小值
    newSizePx = Math.max(minSizePx, newSizePx);

    // 检查原始尺寸是否是固定单位
    const prevOriginalSize = prevPanel.size();
    const prevIsFixedSize = prevOriginalSize && typeof prevOriginalSize === 'string' && !prevOriginalSize.endsWith('%');

    // 更新前一个面板的尺寸
    if (prevIsFixedSize) {
      // 如果前一个面板是固定单位，使用像素值
      prevPanel.currentSize.set(`${Math.round(newSizePx)}px`);
    } else {
      // 如果前一个面板是百分比或数字，使用百分比
      const newSizePercent = (newSizePx / totalSize) * 100;
      prevPanel.currentSize.set(`${newSizePercent}%`);
    }

    // 关键修复：对于后面的所有 panel，需要保持它们的实际像素尺寸不变
    // 获取后面所有 panel 的当前实际尺寸
    const remainingPanels = panels.slice(barIndex + 1);
    const barCount = remainingPanels.length - 1; // bar 的数量比 panel 少 1
    const totalBarSize = barCount * barSize;

    // 计算剩余空间
    const remainingSpace = totalSize - newSizePx - totalBarSize;

    // 首先获取每个 panel 的当前实际像素尺寸（在修改之前）
    const currentSizes: number[] = [];
    let totalCurrentSize = 0;

    remainingPanels.forEach((panel) => {
      const panelElement = panelElements[panels.indexOf(panel)];
      const computedSize = isHorizontal ? panelElement.offsetWidth : panelElement.offsetHeight;
      currentSizes.push(computedSize);
      totalCurrentSize += computedSize;
    });

    // 如果只有一个后续 panel，直接设置它的尺寸为剩余空间
    if (remainingPanels.length === 1) {
      const panel = remainingPanels[0];
      // 始终使用像素值，确保尺寸固定
      panel.currentSize.set(`${Math.round(remainingSpace)}px`);
    } else {
      // 如果有多个后续 panel，按当前尺寸的比例分配剩余空间
      remainingPanels.forEach((panel, index) => {
        if (totalCurrentSize > 0) {
          // 按当前尺寸的比例分配
          const ratio = currentSizes[index] / totalCurrentSize;
          const newSize = remainingSpace * ratio;
          // 始终使用像素值，确保尺寸固定
          panel.currentSize.set(`${Math.round(newSize)}px`);
        } else {
          // 如果没有当前尺寸，平均分配
          const avgSize = remainingSpace / remainingPanels.length;
          panel.currentSize.set(`${Math.round(avgSize)}px`);
        }
      });
    }

    // 手动触发变更检测
    this.cdr.markForCheck();
  }

  private onDragEnd(_barIndex: number) {
    // 取消未完成的动画帧
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    // 清除缓存
    this.cachedSplitterRect = null;
    this.cachedBarSize = null;
  }

  /**
   * @zh_CN 将尺寸值转换为像素
   * @en_US Convert size value to pixels
   */
  private parseSizeToPx(size: string | number, totalSize: number): number {
    if (typeof size === 'number') {
      // 数字默认当作像素
      return size;
    }

    if (size.endsWith('%')) {
      const percent = parseFloat(size);
      return (percent / 100) * totalSize;
    }

    if (size.endsWith('px')) {
      return parseFloat(size);
    }

    if (size.endsWith('rem')) {
      const remValue = parseFloat(size);
      // 获取根元素的字体大小（默认 16px）
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return remValue * rootFontSize;
    }

    if (size.endsWith('em')) {
      const emValue = parseFloat(size);
      // 获取父元素的字体大小（这里使用 splitter 的字体大小）
      const parentFontSize = parseFloat(getComputedStyle(this.elementRef.nativeElement).fontSize) || 16;
      return emValue * parentFontSize;
    }

    // 默认当作像素处理
    return parseFloat(size) || 0;
  }

  /**
   * @zh_CN 获取 bar 的尺寸（像素）
   * @en_US Get bar size in pixels
   */
  private getBarSize(): number {
    const barElement = this.elementRef.nativeElement.querySelector('.x-splitter-bar');
    if (barElement) {
      const computedStyle = getComputedStyle(barElement);
      const isHorizontal = this.direction() === 'horizontal';
      const size = isHorizontal ? computedStyle.width : computedStyle.height;
      return parseFloat(size) || 4; // 默认 4px
    }
    return 4; // 默认值
  }
}
