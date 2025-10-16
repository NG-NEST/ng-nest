import { BasePortalOutlet, PortalModule, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EmbeddedViewRef,
  HostBinding,
  ViewEncapsulation,
  input,
  viewChild
} from '@angular/core';
import { XPosition } from '@ng-nest/ui/core';

@Component({
  selector: 'x-drawer-portal',
  imports: [PortalModule],
  templateUrl: './drawer-portal.component.html',
  styleUrls: ['./drawer-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDrawerPortalComponent extends BasePortalOutlet {
  @HostBinding('class.x-drawer-portal') _has = true;

  placement = input<XPosition>();

  @HostBinding('animate.enter') get animateEnter() {
    return `x-slide-${this.placement()}-enter`;
  }
  @HostBinding('animate.leave') get animateLeave() {
    return `x-slide-${this.placement()}-leave`;
  }

  portalOutlet = viewChild.required(CdkPortalOutlet);

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet().hasAttached()) {
      throw Error('drawer portal has attached');
    }
    return this.portalOutlet().attachComponentPortal(portal);
  }
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.portalOutlet().hasAttached()) {
      throw Error('drawer portal has attached');
    }
    return this.portalOutlet().attachTemplatePortal(portal);
  }
}
