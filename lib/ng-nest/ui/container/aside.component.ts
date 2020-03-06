import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  Input,
  HostBinding
} from '@angular/core';
import { XAsidePrefix } from './container.type';

@Component({
  selector: `${XAsidePrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./aside.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAsideComponent implements OnInit {
  @Input() width: number = 12;
  @HostBinding(`style.width.rem`) get getWidth() {
    return this.width;
  }
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XAsidePrefix);
  }

  ngOnInit() {}
}
