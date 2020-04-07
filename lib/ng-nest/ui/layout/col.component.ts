import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Optional,
  Host,
  HostBinding
} from '@angular/core';
import { XColPrefix, XColProperty } from './layout.property';
import { XRowComponent } from './row.component';

@Component({
  selector: `${XColPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./col.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XColComponent extends XColProperty implements OnInit {
  @HostBinding(`class.x-col-24`) get getFlex() {
    return this.xs || this.sm || this.md || this.lg || this.xl || this.span == 24;
  }

  constructor(@Optional() @Host() public rowComponent: XRowComponent, private renderer: Renderer2, private elementRef: ElementRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XColPrefix);
  }

  ngOnInit() {
    this.setSpan();
    this.setOffset();
    this.setSpace();
    this.setLayout();
    this.setInherit();
  }

  setSpan() {
    if (!this.span) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-${this.span}`);
  }

  setOffset() {
    if (!this.offset) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-offset-${this.offset}`);
  }

  setSpace() {
    if (!this.rowComponent?.space) return;
    this.renderer.setStyle(this.elementRef.nativeElement, 'padding-left', `${this.rowComponent.space / 2}rem`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'padding-right', `${this.rowComponent.space / 2}rem`);
  }

  setLayout() {
    if (this.xs) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-xs-${this.xs}`);
    }
    if (this.sm) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-sm-${this.sm}`);
    }
    if (this.md) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-md-${this.md}`);
    }
    if (this.lg) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-lg-${this.lg}`);
    }
    if (this.xl) {
      this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-xl-${this.xl}`);
    }
  }

  setInherit() {
    if (!this.inherit) return;
    this.renderer.addClass(this.elementRef.nativeElement, `${XColPrefix}-inherit`);
  }
}
