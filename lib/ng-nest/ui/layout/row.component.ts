import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  OnInit,
  HostBinding,
  inject
} from '@angular/core';
import { XRowPrefix, XRowProperty } from './layout.property';

@Component({
  selector: `${XRowPrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./row.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XRowComponent extends XRowProperty implements OnInit {
  @HostBinding(`class.x-flex`) get getFlex() {
    return this.justify || this.align ? true : false;
  }

  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, XRowPrefix);
    this.setSpace();
    this.setJustify();
    this.setAlign();
  }

  setSpace() {
    if (!this.space) return;
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'margin-left',
      `-${Number(this.space) / 2}rem`
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'margin-right',
      `-${Number(this.space) / 2}rem`
    );
  }

  setJustify() {
    if (!this.justify) return;
    this.renderer.addClass(this.elementRef.nativeElement, `x-justify-${this.justify}`);
  }

  setAlign() {
    if (!this.align) return;
    this.renderer.addClass(this.elementRef.nativeElement, `x-align-${this.align}`);
  }
}
