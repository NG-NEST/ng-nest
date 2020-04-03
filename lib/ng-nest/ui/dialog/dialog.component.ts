import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { XMoveBoxAnimation, XTemplate, XIsChange, XInputBoolean, XPlace, XEffect, XIsFunction } from '@ng-nest/ui/core';
import { XDialogPrefix, XDialogType, XDialogOverlayRef, XDialogPortal } from './dialog.type';
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
export class XDialogComponent implements OnInit, OnChanges, OnDestroy {
  @Input() title?: XTemplate;
  @Input() @XInputBoolean() visible;
  @Input('before-close') beforeClose?: Function;
  @Input() width: string = '40%';
  @Input() height: string;
  @Input() placement: XPlace = 'center';
  @Input() type: XDialogType = 'info';
  @Input() effect: XEffect = 'white';
  @Input() offset: string = '1rem';
  @Input('hide-close') @XInputBoolean() hideClose?: boolean;
  @Input('close-text') closeText?: string;
  @Input('has-backdrop') hasBackdrop?: boolean = true;
  @Input('class-name') className?: string;
  @Input('backdrop-close') backdropClose: boolean = true;
  @Input('show-cancel') showCancel: boolean = true;
  @Input('cancel-text') cancelText: string = '取消';
  @Input('show-confirm') showConfirm: boolean = true;
  @Input('confirm-text') confirmText: string = '确认';
  @Input() footer: XTemplate;
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();
  @Output() close = new EventEmitter();
  @ViewChild('dialogTpl', { static: true }) dialogTpl: TemplateRef<void>;
  dialogRef: XDialogOverlayRef;
  backdropClick$: Subscription | null = null;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public viewContainerRef: ViewContainerRef,
    public protalService: XPortalService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    XIsChange(changes.visible) && this.setVisible();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  unsubscribe() {
    this.backdropClick$ && this.backdropClick$.unsubscribe();
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
    if (this.hasBackdrop && this.backdropClose) {
      this.backdropClick$ = this.dialogRef.overlayRef.backdropClick().subscribe(() => this.onClose());
    }
  }

  detach() {
    if (this.portalAttached()) {
      this.dialogRef.overlayRef.detach();
      this.unsubscribe();
      this.close.emit();
    }
  }

  portalAttached() {
    return this.dialogRef && this.dialogRef.overlayRef.hasAttached();
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

  moveDone($event) {
    if ($event.toState === 'void') {
      this.dialogRef.overlayRef.dispose();
    }
  }
}
