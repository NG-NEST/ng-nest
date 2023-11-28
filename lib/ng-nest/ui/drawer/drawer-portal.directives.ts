import { Directive, HostBinding, HostListener, inject } from '@angular/core';
import { XDrawerRef } from './drawer-ref';

@Directive({
  selector: `[x-drawer-close]`,
  standalone: true
})
export class XDrawerCloseDirective {
  @HostListener('click', ['$event']) onCloseClick() {
    this.drawerRef && this.drawerRef.close();
  }
  drawerRef = inject(XDrawerRef, { optional: true });
}

@Directive({
  selector: `[x-drawer-title]`,
  standalone: true
})
export class XDrawerTitleDirective {
  @HostBinding('class.x-drawer-portal-title') _has = true;
}

@Directive({
  selector: `[x-drawer-content], x-drawer-content`,
  standalone: true
})
export class XDrawerContentDirective {
  @HostBinding('class.x-drawer-portal-content') _has = true;
}
