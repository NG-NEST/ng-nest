import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { XColorPrefix, XColorProperty } from './color.property';
import { toHex, mixColors, XConfigService, XComputed } from '@ng-nest/ui/core';

@Component({
  selector: 'x-color',
  templateUrl: './color.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XColorComponent extends XColorProperty implements OnInit {
  colors: string[] = [];

  constructor(
    @Inject(DOCUMENT) private doc: any,
    private renderer: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
    public configService: XConfigService
  ) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XColorPrefix);
  }

  ngOnInit() {
    if (!this.hex || this.hex === 'var(--x-primary)') this.hex = XComputed(this.doc.documentElement).getPropertyValue('--x-primary');
    if (this.hex) this.setColors();
  }

  setColors() {
    let colors = [];
    for (let amount of this.amounts as Array<number>) {
      colors.push(toHex(mixColors(this.merge as string, this.hex.trim(), amount as number)));
    }
    this.colors = colors;
  }

  trackByColor(_index: number, item: string) {
    return item;
  }
}
