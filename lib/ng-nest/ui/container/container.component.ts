import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Renderer2, ElementRef, SimpleChanges } from '@angular/core';
import { XContainerPrefix, XContainerProperty } from './container.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XContainerPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XContainerComponent extends XContainerProperty implements OnInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef, public configService: XConfigService) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XContainerPrefix);
  }

  ngOnInit() {
    this.setDirection();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { direction } = changes;
    if (direction && direction.currentValue != direction.previousValue) {
      this.setDirection();
    }
  }

  setDirection() {
    if (this.direction) {
      this.renderer.addClass(this.elementRef.nativeElement, `x-direction-${this.direction}`);
    }
  }
}
