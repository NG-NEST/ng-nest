import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EmbeddedViewRef,
  EventEmitter,
  HostBinding,
  HostListener,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { XSlideAnimation } from '@ng-nest/ui/core';
import { XDialogAnimationEvent, XDrawerAnimationState } from './drawer.property';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'x-drawer-container',
  templateUrl: './drawer-container.component.html',
  styleUrls: ['./drawer-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XSlideAnimation]
})
export class XDrawerContainerComponent extends BasePortalOutlet {
  @HostBinding('class.x-drawer-container') _has = true;
  @HostBinding('@x-slide-animation') public placement?: XDrawerAnimationState;
  @HostListener('@x-slide-animation.done', ['$event']) done({ toState, totalTime }: AnimationEvent) {
    this.animationChanged.next({ action: 'done', state: toState as XDrawerAnimationState, totalTime });
  }
  @HostListener('@x-slide-animation.start', ['$event']) start({ toState, totalTime }: AnimationEvent) {
    this.animationChanged.next({ action: 'start', state: toState as XDrawerAnimationState, totalTime });
  }
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  animationChanged = new EventEmitter<XDialogAnimationEvent>();

  constructor() {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throw Error('drawer portal has attached');
    }
    return this.portalOutlet.attachComponentPortal(portal);
  }
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.portalOutlet.hasAttached()) {
      throw Error('drawer portal has attached');
    }
    return this.portalOutlet.attachTemplatePortal(portal);
  }
}
