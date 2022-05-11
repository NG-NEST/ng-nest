import { Directive, ElementRef, HostBinding, HostListener, Optional } from '@angular/core';
import { XDialogRef } from './dialog-ref';

@Directive({
  selector: `[x-dialog-close]`
})
export class XDialogCloseDirective {
  @HostListener('click', ['$event']) onCloseClick() {
    this.dialogRef && this.dialogRef.close();
  }
  constructor(@Optional() public dialogRef: XDialogRef<any>) {}
}

@Directive({
  selector: `[x-dialog-title]`
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
  selector: `[x-dialog-drag-handle], x-dialog-drag-handle`
})
export class XDialogDragHandleDirective {
  constructor(@Optional() public dialogRef: XDialogRef<any>, private elementRef: ElementRef) {}

  ngOnInit() {
    this.dialogRef.dragHandleRefs.push(this.elementRef);
  }
}
