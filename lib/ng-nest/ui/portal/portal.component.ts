import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';
import { PortalPrefix } from './portal.type';

@Component({
  selector: 'x-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPortalComponent {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.elementRef.nativeElement, PortalPrefix);
  }
}
