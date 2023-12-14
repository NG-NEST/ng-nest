import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  inject
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { XColorPrefix, XColorProperty } from './color.property';
import { toHex, mixColors, XConfigService, XComputed } from '@ng-nest/ui/core';

@Component({
  selector: 'x-color',
  standalone: true,
  templateUrl: './color.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XColorComponent extends XColorProperty implements OnInit {
  colors: string[] = [];
  private doc = inject(DOCUMENT);
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, XColorPrefix);
    if (!this.hex || this.hex === 'var(--x-primary)')
      this.hex = XComputed(this.doc.documentElement).getPropertyValue('--x-primary');
    if (this.hex) this.setColors();
  }

  setColors() {
    let colors = [];
    for (let amount of this.amounts as Array<number>) {
      colors.push(toHex(mixColors(this.merge as string, this.hex.trim(), amount as number)));
    }
    this.colors = colors;
  }
}
