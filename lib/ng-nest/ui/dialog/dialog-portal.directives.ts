import { Directive, HostBinding, HostListener, inject } from '@angular/core';
import { XDialogRef } from './dialog-ref';
import { CdkDragHandle } from '@angular/cdk/drag-drop';

@Directive({
  selector: `[x-dialog-close]`
})
export class XDialogCloseDirective {
  @HostListener('click') onCloseClick() {
    this.dialogRef && this.dialogRef.close();
  }
  dialogRef = inject(XDialogRef<any>, { optional: true });
}

@Directive({
  selector: `[x-dialog-title], x-dialog-title`
})
export class XDialogTitleDirective {
  @HostBinding('class.x-dialog-portal-title') _has = true;
}

@Directive({
  selector: `[x-dialog-content], x-dialog-content`
})
export class XDialogContentDirective {
  @HostBinding('class.x-dialog-portal-content') _has = true;
}

@Directive({
  selector: `[x-dialog-actions], x-dialog-actions`
})
export class XDialogActionsDirective {
  @HostBinding('class.x-dialog-portal-actions') _has = true;
}

@Directive({
  selector: `[x-dialog-drag-handle], x-dialog-drag-handle`,
  hostDirectives: [
    {
      directive: CdkDragHandle,
      inputs: ['cdkDragHandleDisabled: xDialogDragHandleDisabled']
    }
  ]
})
export class XDialogDragHandleDirective {
  @HostBinding('class.x-dialog-portal-drag-handle') get getDraggable() {
    return !this.dialogRef?.fullscreen && this.dialogRef?.option.draggable;
  }
  dialogRef = inject(XDialogRef<any>, { optional: true });
}

@Directive({
  selector: `[x-dialog-fullscreen], x-dialog-fullscreen`
})
export class XDialogFullscreenDirective {
  @HostListener('click') onFullscreenClick() {
    this.dialogRef && this.dialogRef.onFullscreen();
  }
  dialogRef = inject(XDialogRef<any>, { optional: true });
}
