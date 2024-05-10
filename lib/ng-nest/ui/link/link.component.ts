import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectionStrategy,
  inject,
  computed,
  viewChild,
  effect
} from '@angular/core';
import { XLinkPrefix, XLinkProperty } from './link.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XLinkPrefix}`,
  standalone: true,
  imports: [NgClass, XIconComponent],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XLinkComponent extends XLinkProperty {
  link = viewChild.required<ElementRef<HTMLLinkElement>>('link');

  classMapSignal = computed(() => ({
    [`${XLinkPrefix}-${this.type()}`]: !XIsEmpty(this.type())
  }));

  private renderer = inject(Renderer2);

  constructor() {
    super();
    effect(() => {
      if (XIsEmpty(this.href()) && this.link()) {
        this.renderer.removeAttribute(this.link().nativeElement, 'href');
      }
    });
  }
}
