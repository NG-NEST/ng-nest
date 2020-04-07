import { Component, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef, OnInit, HostBinding } from '@angular/core';
import { XRowPrefix, XRowProperty } from './layout.property';

@Component({
  selector: `${XRowPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./row.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XRowComponent extends XRowProperty implements OnInit {
  
  @HostBinding(`class.x-flex`) get getFlex() {
    return this.justify || this.align;
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XRowPrefix);
  }

  ngOnInit() {
    this.setSpace();
    this.setJustify();
    this.setAlign();
  }

  setSpace() {
    if (!this.space) return;
    this.renderer.setStyle(this.elementRef.nativeElement, 'margin-left', `-${this.space / 2}rem`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'margin-right', `-${this.space / 2}rem`);
  }

  setJustify() {
    if (!this.justify) return;
    this.renderer.addClass(this.elementRef.nativeElement, `x-justity-${this.justify}`);
  }

  setAlign() {
    if (!this.align) return;
    this.renderer.addClass(this.elementRef.nativeElement, `x-align-${this.align}`);
  }
}
