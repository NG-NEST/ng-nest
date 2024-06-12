import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  AfterViewInit,
  OnDestroy,
  computed,
  HostBinding,
  signal,
  afterRender,
  viewChild
} from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XButtonPrefix, XButtonProperty } from './button.property';
import { XButtonsComponent } from './buttons.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XRippleDirective } from '@ng-nest/ui/ripple';
import { NgClass } from '@angular/common';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: `${XButtonPrefix}`,
  standalone: true,
  imports: [NgClass, XIconComponent, XRippleDirective],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonComponent extends XButtonProperty implements AfterViewInit, OnDestroy {
  buttonRef = viewChild.required('buttonRef', { read: ElementRef<HTMLElement> });
  private buttons = inject(XButtonsComponent, { optional: true, host: true });
  private focusMontitor = inject(FocusMonitor);
  transition = signal(false);

  @HostBinding('style.marginLeft') get marginLeft() {
    return this.buttons?.space();
  }
  @HostBinding('style.marginRight') get marginRight() {
    return this.buttons?.space();
  }
  @HostBinding('style.pointerEvents') get pointerEvents() {
    return this.disabledComputed() ? 'none' : '';
  }

  constructor() {
    super();
    afterRender(() => {
      this.transition.set(true);
    });
  }

  classMap = computed(() => ({
    [`${XButtonPrefix}-${this.type()}`]: !XIsEmpty(this.type()) && !this.plain(),
    [`${XButtonPrefix}-${this.type()}-plain`]: !XIsEmpty(this.type()) && this.plain(),
    [`${XButtonPrefix}-${this.type()}-text`]: !XIsEmpty(this.type()) && this.text(),
    [`${XButtonPrefix}-${this.type()}-flat`]: !XIsEmpty(this.type()) && this.flat(),
    [`x-size-${this.size()}`]: !XIsEmpty(this.size()),
    [`x-direction-${this.direction()}`]: !XIsEmpty(this.direction())
  }));

  roundSignal = computed(() => {
    return this.buttons?.round() || this.round();
  });

  disabledComputed = computed(() => {
    return this.loading() || this.disabled();
  });

  ngAfterViewInit() {
    this.focusMontitor.monitor(this.buttonRef(), true);
  }

  ngOnDestroy() {
    this.focusMontitor.stopMonitoring(this.buttonRef());
  }
}
