import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Host,
  Optional,
  ElementRef
} from '@angular/core';
import { XMenuNodeProperty, XMenuNodePrefix } from './menu.property';
import { XMenuComponent } from './menu.component';

@Component({
  selector: `${XMenuNodePrefix}`,
  templateUrl: './menu-node.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XMenuNodeComponent extends XMenuNodeProperty {
  constructor(@Host() @Optional() public menu: XMenuComponent, public cdr: ChangeDetectorRef, public elementRef: ElementRef) {
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
