import {
  Component,
  ViewEncapsulation,
  ElementRef,
  ChangeDetectionStrategy,
  OnDestroy,
  inject,
  signal,
  computed,
  viewChild,
  effect
} from '@angular/core';
import { XAvatarPrefix, XAvatarProperty } from './avatar.property';
import { XIsEmpty, XIsNumber, XIsString, XIsObject, XComputedStyle, XResize, XToCssPx } from '@ng-nest/ui/core';
import { DOCUMENT, NgClass, NgStyle } from '@angular/common';
import { debounceTime, map } from 'rxjs';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { toSignal } from '@angular/core/rxjs-interop';
import type { XClassMap, XResizeObserver, XResponseSize } from '@ng-nest/ui/core';

@Component({
  selector: `${XAvatarPrefix}`,
  standalone: true,
  imports: [NgClass, NgStyle, XOutletDirective, XIconComponent],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAvatarComponent extends XAvatarProperty implements OnDestroy {
  private document = inject(DOCUMENT);
  private labelRef = viewChild<ElementRef<HTMLElement>>('labelRef');
  private fontSize = computed(() => parseFloat(XComputedStyle(this.document.documentElement, 'font-size')));
  private resizeObserver!: XResizeObserver;
  private elementRef = inject(ElementRef);
  private labelWidth = signal(this.labelRef()?.nativeElement.clientWidth);
  private documentWidth = toSignal(
    XResize(this.document.documentElement).pipe(
      debounceTime(30),
      map(({ resizeObserver }) => {
        this.resizeObserver = resizeObserver;
        return this.document.documentElement.clientWidth;
      })
    ),
    {
      initialValue: this.document.documentElement.clientWidth
    }
  );
  isImgError = signal(false);
  styleMap = computed(() => {
    const size = this.size();
    const width = this.documentWidth();
    if (XIsNumber(size)) {
      return {
        height: `${size}px`,
        width: `${size}px`,
        lineHeight: `${size}px`,
        fontSize: `${size * 0.6}px`
      };
    } else if (XIsObject<XResponseSize>(size)) {
      const { xs, sm, md, lg, xl } = size;
      let nsize = 40;
      if (xs && width < 768) {
        nsize = xs;
      }
      if (sm && width >= 768) {
        nsize = sm;
      }
      if (md && width >= 992) {
        nsize = md;
      }
      if (lg && width >= 1200) {
        nsize = lg;
      }
      if (xl && width >= 1920) {
        nsize = xl;
      }
      return {
        height: `${nsize}px`,
        width: `${nsize}px`,
        lineHeight: `${nsize}px`,
        fontSize: `${nsize * 0.6}px`
      };
    } else {
      return {};
    }
  });
  classMapSignal = computed(() => {
    const classMap: XClassMap = {
      [`${XAvatarPrefix}-${this.shape()}`]: !XIsEmpty(this.shape())
    };
    const size = this.size();
    if (XIsString(size)) {
      classMap[`${XAvatarPrefix}-${size}`] = !XIsEmpty(size);
    } else if (XIsObject<XResponseSize>(size)) {
      classMap[`${XAvatarPrefix}-medium`] = true;
    }

    return classMap;
  });
  labelStyleMap = computed(() => {
    const label = this.label();
    const labelRef = this.labelRef();
    const labelWidth = this.labelWidth();
    if (!label || !this.elementRef || !labelRef || !labelWidth) return {};
    const eleWidth = this.elementRef.nativeElement.clientWidth;
    let scale = (eleWidth - XToCssPx(this.gap(), this.fontSize()) * 2) / labelWidth;
    scale = scale > 1 ? 1 : scale;
    return { transform: `scale(${scale})` };
  });

  constructor() {
    super();
    effect(() => this.documentWidth());
  }

  ngAfterContentChecked() {
    this.labelWidth.set(this.labelRef()?.nativeElement.clientWidth);
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  imgError() {
    this.isImgError.set(true);
  }
}
