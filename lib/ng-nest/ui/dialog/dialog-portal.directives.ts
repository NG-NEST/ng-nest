import { Directive, ElementRef, HostBinding, HostListener, inject } from '@angular/core';
import { XDialogRef } from './dialog-ref';

@Directive({
  selector: `[x-dialog-close]`,
  standalone: true
})
export class XDialogCloseDirective {
  @HostListener('click', ['$event']) onCloseClick() {
    this.dialogRef && this.dialogRef.close();
  }
  dialogRef = inject(XDialogRef<any>, { optional: true });
}

@Directive({
  selector: `[x-dialog-title], x-dialog-title`,
  standalone: true
})
export class XDialogTitleDirective {
  @HostBinding('class.x-dialog-portal-title') _has = true;
}

@Directive({
  selector: `[x-dialog-content], x-dialog-content`,
  standalone: true
})
export class XDialogContentDirective {
  @HostBinding('class.x-dialog-portal-content') _has = true;
}

@Directive({
  selector: `[x-dialog-actions], x-dialog-actions`,
  standalone: true
})
export class XDialogActionsDirective {
  @HostBinding('class.x-dialog-portal-actions') _has = true;
}

@Directive({
  selector: `[x-dialog-drag-handle], x-dialog-drag-handle`,
  standalone: true
})
export class XDialogDragHandleDirective {
  @HostBinding('class.x-dialog-portal-drag-handle') get getDraggable() {
    return !this.dialogRef?.fullscreen && this.dialogRef?.option.draggable;
  }
  dialogRef = inject(XDialogRef<any>, { optional: true });
  private elementRef = inject(ElementRef);

  ngOnInit() {
    this.dialogRef?.dragHandleRefs.push(this.elementRef);
  }
}

@Directive({
  selector: `[x-dialog-fullscreen], x-dialog-fullscreen`,
  standalone: true
})
export class XDialogFullscreenDirective {
  @HostListener('click', ['$event']) onFullscreenClick() {
    this.dialogRef && this.dialogRef.onFullscreen();
  }
  dialogRef = inject(XDialogRef<any>, { optional: true });
}
