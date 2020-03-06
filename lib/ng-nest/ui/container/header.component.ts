import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  Optional,
  Host,
  HostBinding
} from '@angular/core';
import { XHeaderPrefix } from './container.type';
import { XContainerComponent } from './container.component';

@Component({
  selector: `${XHeaderPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XHeaderComponent implements OnInit {
  @Input() height: number = 3;
  @HostBinding(`style.height.rem`) get getHeight() {
    return this.height;
  }
  constructor(
    @Optional() @Host() public container: XContainerComponent,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) {
    this.renderer.addClass(this.elementRef.nativeElement, XHeaderPrefix);
  }

  ngOnInit() {
    this.setDirection();
  }

  setDirection() {
    if (!this.container || this.container.direction) return;
    this.container.direction = 'column';
  }
}
