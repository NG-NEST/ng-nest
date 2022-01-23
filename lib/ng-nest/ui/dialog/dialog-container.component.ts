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
import { XMoveBoxAnimation } from '@ng-nest/ui/core';
import { XDialogAnimationEvent, XDialogAnimationState } from './dialog.property';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'x-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveBoxAnimation]
})
export class XDialogContainerComponent extends BasePortalOutlet {
  @HostBinding('class.x-dialog-container') _has = true;
  @HostBinding('@x-move-box-animation') public placement?: XDialogAnimationState;
  @HostListener('@x-move-box-animation.done', ['$event']) done({ toState, totalTime }: AnimationEvent) {
    this.animationChanged.next({ action: 'done', state: toState as XDialogAnimationState, totalTime });
  }
  @HostListener('@x-move-box-animation.start', ['$event']) start({ toState, totalTime }: AnimationEvent) {
    this.animationChanged.next({ action: 'start', state: toState as XDialogAnimationState, totalTime });
  }
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;

  animationChanged = new EventEmitter<XDialogAnimationEvent>();

  constructor() {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throw Error('dialog portal has attached');
    }
    return this.portalOutlet.attachComponentPortal(portal);
  }
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.portalOutlet.hasAttached()) {
      throw Error('dialog portal has attached');
    }
    return this.portalOutlet.attachTemplatePortal(portal);
  }
}
