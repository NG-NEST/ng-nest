import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  HostListener,
  HostBinding,
  inject,
  input,
  computed,
  viewChild,
  signal,
  output,
  DestroyRef
} from '@angular/core';
import { XTooltipPortalPrefix } from './tooltip.property';
import { XPlacement, XTemplate, XIsEmpty } from '@ng-nest/ui/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XTooltipPortalPrefix}`,
  imports: [NgClass, XOutletDirective],
  templateUrl: './tooltip-portal.component.html',
  styleUrls: ['./tooltip-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTooltipPortalComponent {
  placement = input<XPlacement>();
  content = input<XTemplate>();
  box = input<DOMRect>();
  color = input<string>();
  backgroundColor = input<string>();
  hoverChanged = output<boolean>();
  destroy = signal(false);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
    });
  }

  @HostListener('mouseenter') mouseenter() {
    if (this.destroy()) return;
    this.hoverChanged.emit(true);
  }
  @HostListener('mouseleave') mouseleave() {
    if (this.destroy()) return;
    this.hoverChanged.emit(false);
  }

  @HostBinding('animate.enter') animateEnter = 'x-fade-enter';
  @HostBinding('animate.leave') animateLeave = 'x-fade-leave';

  tooltipPortal = viewChild.required('tooltipPortal', { read: ElementRef<HTMLElement> });

  classMap = computed(() => ({
    [`${XTooltipPortalPrefix}-${this.placement()}`]: !XIsEmpty(this.placement())
  }));
}
