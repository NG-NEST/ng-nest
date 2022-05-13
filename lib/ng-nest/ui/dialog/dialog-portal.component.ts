import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ContentChildren,
  EmbeddedViewRef,
  EventEmitter,
  HostBinding,
  HostListener,
  QueryList,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { XMoveBoxAnimation } from '@ng-nest/ui/core';
import { XDialogAnimationEvent, XDialogAnimationState, XDialogRefOption } from './dialog.property';
import { AnimationEvent } from '@angular/animations';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { XDialogRef } from './dialog-ref';
import { XResizableEvent } from '@ng-nest/ui/resizable';

@Component({
  selector: 'x-dialog-portal',
  templateUrl: './dialog-portal.component.html',
  styleUrls: ['./dialog-portal.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveBoxAnimation]
})
export class XDialogPortalComponent extends BasePortalOutlet {
  // @HostBinding('class.x-dialog-portal') _has = true;
  @HostBinding('@x-move-box-animation') public placement?: XDialogAnimationState;
  @HostListener('@x-move-box-animation.done', ['$event']) done({ toState, totalTime }: AnimationEvent) {
    this.animationChanged.next({ action: 'done', state: toState as XDialogAnimationState, totalTime });
  }
  @HostListener('@x-move-box-animation.start', ['$event']) start({ toState, totalTime }: AnimationEvent) {
    this.animationChanged.next({ action: 'start', state: toState as XDialogAnimationState, totalTime });
  }
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet!: CdkPortalOutlet;
  @ViewChild(CdkDrag, { static: true }) dragRef!: CdkDrag;

  @ContentChildren(CdkDragHandle, { descendants: true }) handles!: QueryList<CdkDragHandle>;

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

  dialogBox: { [key: string]: any } = {};

  constructor(private renderer: Renderer2) {
    super();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    let list = new QueryList<CdkDragHandle>();
    for (let item of this.dialogRef.dragHandleRefs) {
      list.reset([...list.toArray(), new CdkDragHandle(item, this.dragRef)]);
    }
    this.dragRef._handles = list;
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

  resizing(event: XResizableEvent) {
    const contentHeight = Number(this.initContentHeight) + Number(event.clientHeight) - Number(this.initHeight);
    this.renderer.setStyle(this.dialogContent, 'max-height', 'initial');
    this.renderer.setStyle(this.dialogContent, 'flex', 'initial');
    if (['top-start', 'top-end', 'bottom', 'top', 'bottom-start', 'bottom-end'].includes(event.direction as string)) {
      this.renderer.setStyle(this.dialogContent, 'height', `${contentHeight}px`);
    }
  }
}
