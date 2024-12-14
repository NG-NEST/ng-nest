import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EmbeddedViewRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Renderer2,
  ViewEncapsulation,
  contentChildren,
  inject,
  model,
  viewChild
} from '@angular/core';
import { XMoveBoxAnimation } from '@ng-nest/ui/core';
import { XDialogAnimationEvent, XDialogAnimationState, XDialogRefOption } from './dialog.property';
import { AnimationEvent } from '@angular/animations';
import { CdkDrag, CdkDragEnd, CdkDragHandle, DragDropModule } from '@angular/cdk/drag-drop';
import { XDialogRef } from './dialog-ref';

@Component({
  selector: 'x-dialog-portal',
  imports: [DragDropModule, PortalModule],
  templateUrl: './dialog-portal.component.html',
  styleUrls: ['./dialog-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveBoxAnimation]
})
export class XDialogPortalComponent extends BasePortalOutlet {
  // @HostBinding('class.x-dialog-portal') _has = true;
  placement = model.required<XDialogAnimationState>();
  @HostBinding('@x-move-box-animation') public get getPlacement() {
    return this.placement();
  }
  @HostListener('@x-move-box-animation.done', ['$event']) done({ toState, totalTime }: AnimationEvent) {
    this.animationChanged.next({
      action: 'done',
      state: toState as XDialogAnimationState,
      totalTime
    });
  }
  @HostListener('@x-move-box-animation.start', ['$event']) start({ toState, totalTime }: AnimationEvent) {
    this.animationChanged.next({
      action: 'start',
      state: toState as XDialogAnimationState,
      totalTime
    });
  }
  renderer = inject(Renderer2);
  changeDetectorRef = inject(ChangeDetectorRef);
  portalOutlet = viewChild.required(CdkPortalOutlet);
  dragRef = viewChild.required(CdkDrag);
  handles = contentChildren(CdkDragHandle, { descendants: true });
  animationChanged = new EventEmitter<XDialogAnimationEvent>();
  option!: XDialogRefOption;
  dialogRef!: XDialogRef<any>;

  offsetLeft = 0;
  offsetTop = 0;
  minWidth = '0rem';
  minHeight = '0rem';
  initHeight = 0;
  initContentHeight = 0;
  dialogContent?: HTMLElement;
  defaultMaximize = false;
  overlayElement?: HTMLElement;
  hostElement?: HTMLElement;
  distance = { x: 0, y: 0 };

  dialogBox: { [key: string]: any } = {};

  ngOnInit() {
    this.dialogBox['draggable'] = this.defaultMaximize ? this.dialogBox['draggable'] : this.option.draggable;
  }

  ngAfterViewInit() {
    if (this.dialogRef.dragHandleRefs.length === 0) {
      this.dialogBox['draggable'] = false;
      this.option.draggable = false;
      return;
    }
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet().hasAttached()) {
      throw Error('dialog portal has attached');
    }
    return this.portalOutlet().attachComponentPortal(portal);
  }
  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.portalOutlet().hasAttached()) {
      throw Error('dialog portal has attached');
    }
    return this.portalOutlet().attachTemplatePortal(portal);
  }

  onDragEnded(event: CdkDragEnd) {
    this.distance = {
      x: this.distance.x + event.distance.x,
      y: this.distance.y + event.distance.y
    };
  }
}
