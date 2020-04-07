import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
import { XLinkPrefix, XLinkProperty } from './link.property';

@Component({
  selector: `${XLinkPrefix}`,
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XLinkComponent extends XLinkProperty implements OnInit {
  hover: boolean = false;

  @HostListener('mouseenter') mouseenter() {
    this.hover = true;
    this.cdr.detectChanges();
  }

  @HostListener('mouseleave') mouseleave() {
    this.hover = false;
    this.cdr.detectChanges();
  }

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  setClassMap() {
    this.classMap[`${XLinkPrefix}-${this.type}`] = this.type ? true : false;
  }
}
