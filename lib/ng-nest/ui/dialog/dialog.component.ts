import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  OnDestroy
} from '@angular/core';
import { XMoveBoxAnimation, XIsChange, XIsFunction } from '@ng-nest/ui/core';
import { XDialogPrefix, XDialogOverlayRef, XDialogProperty, XDialogContainer } from './dialog.property';
import { XPortalService } from '@ng-nest/ui/portal';
import { Subscription, Subject } from 'rxjs';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { XI18nDialog, XI18nService } from '@ng-nest/ui/i18n';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: `${XDialogPrefix}`,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveBoxAnimation]
})
export class XDialogComponent extends XDialogProperty implements OnChanges, OnDestroy {
  @ViewChild('dialogTpl', { static: false }) dialogTpl!: TemplateRef<void>;
  dialogRef!: XDialogOverlayRef;
  backdropClick$!: Subscription;
  scrollStrategy: BlockScrollStrategy;
  locale: XI18nDialog = {};

  private _unSubject = new Subject<void>();

  get getCancelText() {
    return this.cancelText || this.locale.cancelText;
  }

  get getConfirmText() {
    return this.confirmText || this.locale.confirmText;
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public viewContainerRef: ViewContainerRef,
    public protalService: XPortalService,
    public i18n: XI18nService
  ) {
    super();
    this.scrollStrategy = this.protalService.overlay.scrollStrategies.block();
  }

  ngOnInit() {
    this.i18n.localeChange
      .pipe(
        map((x) => x.dialog as XI18nDialog),
        takeUntil(this._unSubject)
      )
      .subscribe((x) => {
        this.locale = x;
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { visible } = changes;
    XIsChange(visible) && this.setVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
    this._unSubject.next();
    this._unSubject.unsubscribe();
  }

  unsubscribe() {
    this.backdropClick$?.unsubscribe();
  }

  setVisible() {
    if (this.visible) {
      this.create();
    } else {
      this.detach();
      // this.visibleChange.emit(false);
    }
  }

  create() {
    this.dialogRef = this.protalService.attach({
      content: this.dialogTpl,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        panelClass: [XDialogContainer, this.className],
        hasBackdrop: Boolean(this.hasBackdrop),
        positionStrategy: this.protalService.setPlace(this.placement, this.width, this.height, this.offset)
      }
    });
    // this.scrollStrategy.enable();
    if (this.hasBackdrop && this.backdropClose && this.dialogRef?.overlayRef) {
      this.backdropClick$ = this.dialogRef.overlayRef.backdropClick().subscribe(() => this.onClose());
    }
  }

  detach() {
    if (this.portalAttached()) {
      this.visible = false;
      this.visibleChange.emit(this.visible);
      this.dialogRef?.overlayRef?.detach();
      // this.scrollStrategy.disable();
      this.unsubscribe();
      this.close.emit();
    }
  }

  portalAttached() {
    return this.dialogRef?.overlayRef?.hasAttached();
  }

  onClose() {
    if (XIsFunction(this.beforeClose)) {
      this.beforeClose();
    } else {
      this.detach();
    }
  }

  onCancel() {
    this.onClose();
    this.cancel.emit();
  }

  onConfirm() {
    this.onClose();
    this.confirm.emit();
  }

  moveDone($event: { toState: string }) {
    if ($event.toState === 'void') {
      this.closeDone.emit($event);
      this.dialogRef?.overlayRef?.dispose();
    } else {
      this.showDone.emit($event);
    }
  }
}
