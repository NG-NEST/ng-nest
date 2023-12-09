import { Directive, ElementRef, Host, Optional, Self, TemplateRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  selector: 'ng-template[xTabLink]',
  exportAs: 'xTabLinkTemplate',
  standalone: true,
})
export class XTabLinkTemplateDirective {
  constructor(@Host() public templateRef: TemplateRef<void>) {}
}

@Directive({
  selector: 'a[x-tab-link]',
  exportAs: 'xTabLink',
  standalone: true,
})
export class XTabLinkDirective {
  constructor(
    public elementRef: ElementRef,
    @Optional() @Self() public routerLink?: RouterLink,
    @Optional() @Self() public routerLinkWithHref?: RouterLink
  ) {}
}
