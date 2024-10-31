import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
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
import { XPlacement, XFadeAnimation, XTemplate, XIsEmpty } from '@ng-nest/ui/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XTooltipPortalPrefix}`,
  standalone: true,
  imports: [NgClass, XOutletDirective],
  templateUrl: './tooltip-portal.component.html',
  styleUrls: ['./tooltip-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XFadeAnimation]
})
export class XTooltipPortalComponent {
  placement = input<XPlacement>();
  content = input<XTemplate>();
  box = input<DOMRect>();
  color = input<string>();
  backgroundColor = input<string>();
  hoverChanged = output<boolean>();
  arrowHidden = signal(true);
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

  @HostBinding('@x-fade-animation') animation = true;
  @HostListener('@x-fade-animation.done', ['$event']) done(event: { toState: any }) {
    if (this.destroy()) return;
    if (event.toState === true) {
      this.setArrow();
      this.arrowHidden.set(false);
    }
  }

  tooltipPortal = viewChild.required('tooltipPortal', { read: ElementRef<HTMLElement> });
  tooltipArrow = viewChild.required('tooltipArrow', { read: ElementRef<HTMLElement> });
  tooltipArrowAfter = viewChild.required('tooltipArrowAfter', { read: ElementRef<HTMLElement> });

  classMap = computed(() => ({
    [`${XTooltipPortalPrefix}-${this.placement()}`]: !XIsEmpty(this.placement())
  }));

  portalBox = computed(() => this.tooltipPortal().nativeElement.getBoundingClientRect());
  arrowBox = computed(() => this.tooltipArrow().nativeElement.getBoundingClientRect());
  private renderer = inject(Renderer2);

  setArrow() {
    const arrowBox = this.arrowBox();
    const portalBox = this.portalBox();
    const tooltipArrow = this.tooltipArrow().nativeElement;
    const tooltipArrowAfter = this.tooltipArrowAfter().nativeElement;
    const box = this.box()!;
    let offset = arrowBox.height / 2;
    if (portalBox.height > box.height && (this.includes('right-') || this.includes('left-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(tooltipArrow, 'top', `${box.height / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(tooltipArrow, 'bottom', `${box.height / 2 - offset}px`);
      }
    } else if (portalBox.width > box.width && (this.includes('top-') || this.includes('bottom-'))) {
      if (this.includes('-start')) {
        this.renderer.setStyle(tooltipArrow, 'left', `${box.width / 2 - offset}px`);
      } else if (this.includes('-end')) {
        this.renderer.setStyle(tooltipArrow, 'right', `${box.width / 2 - offset}px`);
      }
    }
    if (!this.backgroundColor()) return;
    const ptSplit = this.placement()?.split('-');
    if (ptSplit && ptSplit.length > 0) {
      this.renderer.setStyle(tooltipArrow, `border-${ptSplit[0]}-color`, this.backgroundColor());
      this.renderer.setStyle(tooltipArrowAfter, `border-${ptSplit[0]}-color`, this.backgroundColor());
    }
  }

  includes(arrow: string) {
    return this.placement()!.indexOf(arrow) >= 0;
  }
}
