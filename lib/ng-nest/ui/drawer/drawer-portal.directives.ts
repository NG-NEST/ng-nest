import { Directive, HostBinding, HostListener, Optional } from '@angular/core';
import { XDrawerRef } from './drawer-ref';

@Directive({
  selector: `[x-drawer-close]`
})
export class XDrawerCloseDirective {
  @HostListener('click', ['$event']) onCloseClick() {
    this.drawerRef && this.drawerRef.close();
  }
  constructor(@Optional() public drawerRef: XDrawerRef<any>) {}
}

@Directive({
  selector: `[x-drawer-title]`
})
export class XDrawerTitleDirective {
  @HostBinding('class.x-drawer-portal-title') _has = true;
}

@Directive({
  selector: `[x-drawer-content], x-drawer-content`
})
export class XDrawerContentDirective {
  @HostBinding('class.x-drawer-portal-content') _has = true;
}
