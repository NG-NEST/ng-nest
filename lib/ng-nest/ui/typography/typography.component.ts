import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';
import { XTypographyPrefix, XTypographyProperty } from './typography.property';

@Component({
  selector: 'x-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTypographyComponent extends XTypographyProperty implements OnInit {
  firstText!: string;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XTypographyPrefix);
  }

  ngOnInit() {
    if (this.font) this.renderer.setStyle(this.elementRef.nativeElement, 'font-family', this.font);
    if (this.text?.length > 0) this.firstText = this.text.slice(0, 1);
  }
}
