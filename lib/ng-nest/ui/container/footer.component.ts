import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Optional,
  Host,
  HostBinding
} from '@angular/core';
import { XFooterPrefix, XFooterProperty } from './container.property';
import { XContainerComponent } from './container.component';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XFooterPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XFooterComponent extends XFooterProperty implements OnInit {
  @HostBinding(`style.height.rem`) get getHeight() {
    return this.height;
  }
  constructor(
    @Optional() @Host() public container: XContainerComponent,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    public configService: XConfigService
  ) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XFooterPrefix);
  }

  ngOnInit() {
    this.setDirection();
  }

  setDirection() {
    if (!this.container || this.container.direction) return;
    this.container.direction = 'column';
    this.container.setDirection();
  }
}
