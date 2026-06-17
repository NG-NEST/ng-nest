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
import { XDialogAnimationEvent, XDialogAnimationState, XDialogPortalHandle, XDialogRefOption } from './dialog.property';
import { CdkDrag, CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { XDialogDragHandleDirective } from './dialog-portal.directives';

@Component({
  selector: 'x-dialog-portal',
  imports: [DragDropModule, PortalModule],
  templateUrl: './dialog-portal.component.html',
  styleUrls: ['./dialog-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDialogPortalComponent extends BasePortalOutlet implements XDialogPortalHandle {
  placement = model.required<XDialogAnimationState>();
  @HostBinding('animate.enter') public get enimateEnter() {
    return `x-move-${this.placement()}-enter`;
  }
  @HostBinding('animate.leave') public get enimateLeave() {
    return `x-move-${this.placement()}-leave`;
  }
  @HostListener('animationend', ['$event']) done(event: AnimationEvent) {
    this.animationChanged.next({ action: 'end', animationName: event.animationName });
  }
  @HostListener('animationstart', ['$event']) start(event: AnimationEvent) {
    this.animationChanged.next({ action: 'start', animationName: event.animationName });
  }
  renderer = inject(Renderer2);
  changeDetectorRef = inject(ChangeDetectorRef);
  portalOutlet = viewChild.required(CdkPortalOutlet);
  dragRef = viewChild.required(CdkDrag);
  handles = contentChildren(XDialogDragHandleDirective, { descendants: true });
  animationChanged = new EventEmitter<XDialogAnimationEvent>();
  option!: XDialogRefOption;

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
    this.portalOutlet().setDisposeFn(() => {});
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
