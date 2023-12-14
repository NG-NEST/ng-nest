import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  HostBinding,
  inject
} from '@angular/core';
import { XHeaderPrefix, XHeaderProperty } from './container.property';
import { XContainerComponent } from './container.component';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XHeaderPrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XHeaderComponent extends XHeaderProperty implements OnInit {
  @HostBinding(`style.height.rem`) get getHeight() {
    return this.height;
  }
  private container = inject(XContainerComponent, { optional: true, host: true });
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.renderer.addClass(this.elementRef.nativeElement, XHeaderPrefix);
    this.setDirection();
  }

  setDirection() {
    if (!this.container || this.container.direction) return;
    this.container.direction = 'column';
    this.container.setDirection();
  }
}
