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
import { XListOptionPrefix, XListOptionProperty } from './list.property';
import { Highlightable } from '@angular/cdk/a11y';
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
export class XListOptionComponent extends XListOptionProperty implements Highlightable {
  @HostBinding('attr.role') role = 'option';
  elementRef = inject(ElementRef);
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

  setActiveStyles(): void {
    this.active.set(true);
  }
  setInactiveStyles(): void {
    this.active.set(false);
  }

  getLabel() {
    return this.label() as string;
  }
}
