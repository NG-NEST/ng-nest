import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef, Input } from '@angular/core';
import { XMenuNodeProperty, XMenuNodePrefix } from './menu.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XMenuNodePrefix}`,
  templateUrl: './menu-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMenuNodeComponent extends XMenuNodeProperty {
  @Input() menu: any;
  constructor(
    // @Host() @Optional() public menu: XMenuComponent,
    public cdr: ChangeDetectorRef,
    public elementRef: ElementRef,
    public configService: XConfigService
  ) {
    super();
  }
  ngOnInit() {
    if (this.menu?.activatedId == this.node.id) {
      this.menu.activatedElementRef = this.elementRef;
    }
    this.node.change = () => {
      this.cdr.detectChanges();
    };
  }
}
