import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
  computed,
  effect,
  inject
} from '@angular/core';
import { XListOptionHandle, XListOptionPrefix, XListOptionProperty } from './list.property';
import type { Highlightable } from '@angular/cdk/a11y';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XKeywordDirective } from '@ng-nest/ui/keyword';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: `${XListOptionPrefix}`,
  imports: [NgClass, NgTemplateOutlet, XIconComponent, XKeywordDirective],
  templateUrl: './list-option.component.html',
  styleUrls: ['./list-option.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XListOptionComponent extends XListOptionProperty implements Highlightable, XListOptionHandle {
  @HostBinding('attr.role') role = 'option';
  elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  classMap = computed(() => ({}));
  disabled = false;

  nodeStyleComputed = computed(() => {
    return {
      ...(this.nodeStyle() ?? {}),
      ...(this.node()?.style ?? {})
    };
  });

  constructor() {
    super();
    effect(() => (this.disabled = this.forbidden()));
  }

  ngOnDestroy(): void {
    this.active.set(false);
  }

  setActiveStyles(): void {
    this.active.set(true);
  }
  setInactiveStyles(): void {
    this.active.set(false);
  }

  getLabel() {
    return this.label() as string;
  }

  getElementRef() {
    return this.elementRef;
  }
}
