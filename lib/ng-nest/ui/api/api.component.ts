import { Component, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef } from '@angular/core';
import { XApiPrefix } from './api.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XApiPrefix}`,
  templateUrl: './api.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XApiComponent {
  constructor(private renderer: Renderer2, private elementRef: ElementRef, public configService: XConfigService) {
    this.renderer.addClass(this.elementRef.nativeElement, XApiPrefix);
  }
}
