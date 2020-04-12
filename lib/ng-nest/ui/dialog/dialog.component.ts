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
import { XDialogPrefix, XDialogOverlayRef, XDialogPortal, XDialogProperty } from './dialog.property';
import { XPortalService } from '@ng-nest/ui/portal';
import { Subscription } from 'rxjs';

@Component({
  selector: `${XDialogPrefix}`,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XMoveBoxAnimation]
})
export class XDialogComponent extends XDialogProperty implements OnChanges, OnDestroy {
  @ViewChild('dialogTpl', { static: true }) dialogTpl: TemplateRef<void>;
  dialogRef: XDialogOverlayRef;
  backdropClick$: Subscription;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public viewContainerRef: ViewContainerRef,
    public protalService: XPortalService
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.visible) && this.setVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  unsubscribe() {
    this.backdropClick$?.unsubscribe();
  }

  setVisible() {
    if (this.visible) {
      this.create();
    } else {
      this.detach();
    }
  }

  create() {
    this.dialogRef = this.protalService.attach({
      content: this.dialogTpl,
      viewContainerRef: this.viewContainerRef,
      overlayConfig: {
        panelClass: [XDialogPortal, this.className],
        hasBackdrop: this.hasBackdrop,
        positionStrategy: this.protalService.setPlace(this.placement, this.offset, this.width, this.height)
      }
    });
    if (this.hasBackdrop && this.backdropClose && this.dialogRef?.overlayRef) {
      this.backdropClick$ = this.dialogRef.overlayRef.backdropClick().subscribe(() => this.onClose());
    }
  }

  detach() {
    if (this.portalAttached()) {
      this.dialogRef?.overlayRef?.detach();
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
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }

  moveDone($event: { toState: string }) {
    if ($event.toState === 'void') {
      this.dialogRef?.overlayRef?.dispose();
    }
  }
}
