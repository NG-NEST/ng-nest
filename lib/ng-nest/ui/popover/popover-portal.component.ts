import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  HostBinding,
  input,
  computed
} from '@angular/core';
import { XPopoverPortalPrefix, XPopoverTrigger } from './popover.property';
import { XTemplate, XPlacement, XFadeAnimation, XIsEmpty } from '@ng-nest/ui/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XPopoverPortalPrefix}`,
  standalone: true,
  imports: [NgClass, XOutletDirective],
  templateUrl: './popover-portal.component.html',
  styleUrls: ['./popover-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XFadeAnimation]
})
export class XPopoverPortalComponent {
  @HostListener('mouseenter') mouseenter() {
    if (this.trigger() === 'hover') {
      this.portalHover(true);
    }
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.trigger() === 'hover') {
      this.portalHover(false);
    }
  }

  @HostBinding('@x-fade-animation') animation = true;

  title = input<XTemplate>();
  content = input<XTemplate>();
  footer = input<XTemplate>();
  width = input<string>();
  minWidth = input<string>();
  maxWidth = input<string>();
  trigger = input<XPopoverTrigger>();
  placement = input<XPlacement>();
  portalHover!: Function;

  classMap = computed(() => ({
    [`${XPopoverPortalPrefix}-${this.placement()}`]: !XIsEmpty(this.placement())
  }));

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
