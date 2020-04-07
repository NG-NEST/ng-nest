import { Component, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef, HostBinding } from '@angular/core';
import { XAsidePrefix, XAsideProperty } from './container.property';

@Component({
  selector: `${XAsidePrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./aside.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAsideComponent extends XAsideProperty {
  @HostBinding(`style.width.rem`) get getWidth() {
    return this.width;
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XAsidePrefix);
  }
}
