import { Component, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';
import { XBorderPrefix } from './border.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: 'x-border',
  templateUrl: './border.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XBorderComponent {
  constructor(private renderer: Renderer2, private elementRef: ElementRef, public configService: XConfigService) {
    this.renderer.addClass(this.elementRef.nativeElement, XBorderPrefix);
  }
}
