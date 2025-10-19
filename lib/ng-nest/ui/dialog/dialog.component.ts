import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  TemplateRef,
  ViewContainerRef,
  HostBinding,
  inject,
  OnInit,
  signal,
  computed,
  AfterViewInit,
  viewChild,
  effect,
  DestroyRef
} from '@angular/core';
import { XMoveBoxAnimation, XIsFunction, XConfigService, XOpacityAnimation } from '@ng-nest/ui/core';
import {
  XDialogPrefix,
  XDialogOverlayRef,
  XDialogProperty,
  XDialogContainer,
  XDialogAction,
  X_DIALOG_CONTAINER
} from './dialog.property';
import { XPortalService } from '@ng-nest/ui/portal';
import { Subscription, Subject } from 'rxjs';
import { BlockScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { XI18nDialog, XI18nService, zh_CN } from '@ng-nest/ui/i18n';
import { map, takeUntil } from 'rxjs/operators';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { XDialogContainerComponent } from './dialog-container.component';
import { XAlertComponent } from '@ng-nest/ui/alert';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: `${XDialogPrefix}`,
  imports: [NgStyle, NgTemplateOutlet, XAlertComponent, XButtonComponent, XButtonsComponent, XOutletDirective],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveBoxAnimation, XOpacityAnimation]
})
export class XDialogComponent extends XDialogProperty implements OnInit, AfterViewInit {
  private viewContainerRef = inject(ViewContainerRef);
  private protalService = inject(XPortalService);
  private overlay = inject(Overlay);
  private i18n = inject(XI18nService);
  private unSubject = new Subject<void>();

  @HostBinding('class.x-dialog-visible') get getVisible() {
    return this.visible();
  }

  @HostBinding('class') clsName = `${XDialogPrefix}-${this.placement()}`;

  dialogTpl = viewChild.required<TemplateRef<void>>('dialogTpl');
  dialogRef!: XDialogOverlayRef;
  backdropClick$!: Subscription;
  scrollStrategy!: BlockScrollStrategy;
  locale = toSignal(this.i18n.localeChange.pipe(map((x) => x.dialog as XI18nDialog)), { initialValue: zh_CN.dialog });
  overlayElement = signal<HTMLElement | null>(null);
  dialogContent?: HTMLElement;
  initHeight? = 0;
  initContentHeight? = 0;
  isMaximize = signal(false);
  isDefaultMaximize = signal(false);
  dialogBox: { [key: string]: any } = {};
  distance = { x: 0, y: 0 };
  viewInit = signal(false);
  action: XDialogAction | null = null;
  containerInit = false;
  draggableSignal = signal(false);
  maximizeSignal = signal(false);

  getCancelText = computed(() => {
    return this.cancelText() || this.locale().cancelText;
  });

  getConfirmText = computed(() => {
    return this.confirmText() || this.locale().confirmText;
  });

  getStyle = computed(() => {
    console.log(this.protalService.setContainerStyle(this.placement(), this.offset()));
    return this.container
      ? {
          ...this.protalService.setContainerStyle(this.placement(), this.offset()),
          width: this.width(),
          height: this.height(),
          minWidth: this.minWidth(),
          minHeight: this.minHeight()
        }
      : {};
  });
  container = inject<XDialogContainerComponent>(X_DIALOG_CONTAINER, { optional: true });
  configService = inject(XConfigService);

  styleOffsetLeft = signal(0);
  styleOffsetTop = signal(0);

  visibleChanged = toObservable(this.visible);
  draggableChanged = toObservable(this.draggable);

  destroy = signal(false);

  private destroyRef = inject(DestroyRef);

  constructor() {
    super();
    this.visibleChanged.pipe(takeUntil(this.unSubject)).subscribe(() => {
      this.setVisible();
    });
    effect(() => {
      this.draggableSignal.set(this.draggable());
      this.maximizeSignal.set(this.maximize());
      this.dialogBox['draggable'] = this.draggableSignal();
    });
  }

  ngOnInit() {
    this.scrollStrategy = this.protalService.overlay.scrollStrategies.block();
    this.destroyRef.onDestroy(() => {
      this.destroy.set(true);
      this.backdropClick$?.unsubscribe();
      this.unSubject.next();
      this.unSubject.complete();
    });
  }

  ngAfterViewInit(): void {
    this.viewInit.set(true);
  }

  setVisible() {
    if (!this.viewInit()) return;
    if (this.visible()) {
      this.create();
    } else {
      this.onClose('close', false);
    }
  }

  create() {
    if (this.container) {
      this.containerInit = true;
      return;
    }
    this.dialogRef = this.protalService.attach({
      content: this.dialogTpl(),
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        panelClass: [XDialogContainer, this.className()],
        hasBackdrop: this.hasBackdrop(),
        scrollStrategy: this.overlay.scrollStrategies.block(),
        width: this.width(),
        height: this.height(),
        minWidth: this.minWidth(),
        minHeight: this.minHeight(),
        positionStrategy: this.protalService.setPlace(this.placement(), this.offset())
      }
    });
    const { overlayElement } = this.dialogRef.overlayRef!;
    this.overlayElement.set(overlayElement);
    this.setWidthHeight();
    Object.assign(this.dialogBox, {
      width: this.width(),
      height: this.height(),
      minWidth: this.minWidth(),
      minHeight: this.minHeight()
    });
    if (this.hasBackdrop() && this.backdropClose() && this.dialogRef?.overlayRef) {
      this.backdropClick$ = this.dialogRef.overlayRef.backdropClick().subscribe(() => this.onClose('close'));
    }
  }

  setWidthHeight() {
    const ws = ['100%', '100vw'];
    const hs = ['100%', '100vh'];
    if (ws.includes(this.width()) && hs.includes(this.height())) {
      this.isDefaultMaximize.set(true);
      this.draggableSignal.set(false);
      this.maximizeSignal.set(false);
    }
  }

  portalAttached() {
    return this.dialogRef?.overlayRef?.hasAttached();
  }

  onClose(action: XDialogAction, execFunction = true) {
    if (!this.portalAttached() && !this.container) return;
    if (this.container && !this.containerInit) return;
    if (XIsFunction(this.beforeClose()) && execFunction) {
      this.beforeClose()?.(action);
      this.action = action;
    } else {
      this.visible.set(false);
      if (this.portalAttached()) {
        this.dialogRef?.overlayRef?.detach();
        this.backdropClick$?.unsubscribe();
      }
      if ([action, this.action].includes('confirm')) {
        this.confirm.emit();
      }
      if ([action, this.action].includes('cancel')) {
        this.cancel.emit();
      }
      this.containerInit = false;
      this.action = null;
      this.close.emit();
    }
  }

  onDragEnded($event: CdkDragEnd) {
    this.distance = { x: this.distance.x + $event.distance.x, y: this.distance.y + $event.distance.y };
  }

  onSize() {
    if (!this.dialogRef) return;
    this.isMaximize.update((x) => !x);
    if (this.isMaximize()) {
      this.onMaximize();
    } else {
      this.onMinimize();
    }
  }

  onMaximize() {
    this.dialogRef.overlayRef?.updateSize({
      width: '100%',
      height: '100%',
      minWidth: '100%',
      minHeight: '100%'
    });
    this.dialogBox['minWidth'] = '100%';
    this.dialogBox['minHeight'] = '100%';
    this.dialogBox['draggable'] = false;
    this.dialogBox['resizable'] = false;
    if (this.draggableSignal()) {
      this.dialogBox['distance'] = { x: 0, y: 0 };
    }
  }

  onMinimize() {
    this.dialogBox['minWidth'] = this.minWidth();
    this.dialogBox['minHeight'] = this.minHeight();
    this.dialogBox['draggable'] = this.draggableSignal();
    this.dialogRef.overlayRef?.updateSize({
      width: this.dialogBox['width'],
      height: this.dialogBox['height'],
      minWidth: this.dialogBox['minWidth'],
      minHeight: this.dialogBox['minHeight']
    });
    if (this.draggableSignal()) {
      this.dialogBox['distance'] = { ...this.distance };
    }
  }

  moveDone($event: AnimationEvent) {
    if ($event.animationName.endsWith('-leave')) {
      !this.destroy() && this.closeDone.emit($event);
      this.isMaximize.set(false);
      this.dialogBox = {
        draggable: this.draggableSignal()
      };
      this.distance = { x: 0, y: 0 };
      this.dialogRef?.overlayRef?.dispose();
    } else {
      !this.destroy() && this.showDone.emit($event);
    }
  }
}
