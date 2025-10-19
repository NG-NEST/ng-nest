import { PortalModule, CdkPortalOutlet, Portal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation, input, viewChild } from '@angular/core';
import { XPosition } from '@ng-nest/ui/core';

@Component({
  selector: 'x-drawer-portal',
  imports: [PortalModule],
  templateUrl: './drawer-portal.component.html',
  styleUrls: ['./drawer-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDrawerPortalComponent {
  @HostBinding('class.x-drawer-portal') _has = true;

  placement = input<XPosition>();
  portal!: Portal<any>;

  @HostBinding('animate.enter') get animateEnter() {
    return `x-slide-${this.placement()}-enter`;
  }
  @HostBinding('animate.leave') get animateLeave() {
    return `x-slide-${this.placement()}-leave`;
  }

  portalOutlet = viewChild.required(CdkPortalOutlet);

  ngAfterViewInit() {
    this.portalOutlet().setDisposeFn(() => {});
  }
}
