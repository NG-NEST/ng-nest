import { BasePortalOutlet, PortalModule, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
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
import { XDrawerAnimationEvent, XDrawerAnimationState } from './drawer.property';
import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'x-drawer-portal',
  standalone: true,
  imports: [CommonModule, PortalModule],
  templateUrl: './drawer-portal.component.html',
  styleUrls: ['./drawer-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XSlideAnimation]
})
export class XDrawerPortalComponent extends BasePortalOutlet {
  @HostBinding('class.x-drawer-portal') _has = true;
  @HostBinding('@x-slide-animation') public placement?: XDrawerAnimationState;
  @HostListener('@x-slide-animation.done', ['$event']) done({ toState, totalTime }: AnimationEvent) {
    this.animationChanged.next({ action: 'done', state: toState as XDrawerAnimationState, totalTime });
  }
  @HostListener('@x-slide-animation.start', ['$event']) start({ toState, totalTime }: AnimationEvent) {
    this.animationChanged.next({ action: 'start', state: toState as XDrawerAnimationState, totalTime });
  }
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  animationChanged = new EventEmitter<XDrawerAnimationEvent>();

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
