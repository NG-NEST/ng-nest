import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  HostBinding,
  OnInit,
  inject
} from '@angular/core';
import { XAsidePrefix, XAsideProperty } from './container.property';
import { XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XAsidePrefix}`,
  standalone: true,
  template: '<ng-content></ng-content>',
  styleUrls: ['./aside.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAsideComponent extends XAsideProperty implements OnInit {
  @HostBinding(`style.width.rem`) get getWidth() {
    return this.width;
  }

  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  configService = inject(XConfigService);

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, XAsidePrefix);
  }
}
