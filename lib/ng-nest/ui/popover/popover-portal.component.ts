import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostListener,
  HostBinding,
  input,
  computed,
  output
} from '@angular/core';
import { XPopoverPortalPrefix, XPopoverTrigger } from './popover.property';
import { XTemplate, XPlacement, XFadeAnimation, XIsEmpty } from '@ng-nest/ui/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XPopoverPortalPrefix}`,
  imports: [NgClass, XOutletDirective],
  templateUrl: './popover-portal.component.html',
  styleUrls: ['./popover-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XFadeAnimation]
})
export class XPopoverPortalComponent {
  title = input<XTemplate>();
  content = input<XTemplate>();
  footer = input<XTemplate>();
  width = input<string>();
  minWidth = input<string>();
  maxWidth = input<string>();
  trigger = input<XPopoverTrigger>();
  placement = input<XPlacement>();
  portalHover = output<boolean>();

  @HostListener('mouseenter') mouseenter() {
    if (this.trigger() === 'hover') {
      this.portalHover.emit(true);
    }
  }

  @HostListener('mouseleave') mouseleave() {
    if (this.trigger() === 'hover') {
      this.portalHover.emit(false);
    }
  }

  @HostBinding('@x-fade-animation') animation = true;

  classMap = computed(() => ({
    [`${XPopoverPortalPrefix}-${this.placement()}`]: !XIsEmpty(this.placement())
  }));

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
