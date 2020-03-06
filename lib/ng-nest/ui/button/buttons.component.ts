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
import { XButtonsInput, XButtonsPrefix } from './button.type';
import { fillDefault, XInputNumber, XInputBoolean } from '@ng-nest/ui/core';

@Component({
  selector: `${XButtonsPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./buttons.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonsComponent implements OnInit {
  @Input() @XInputNumber() space?: number;
  @Input() @XInputBoolean() notBorder?: boolean;
  @HostBinding('class.x-buttons-space') get getSpace() {
    return this.space;
  }
  @HostBinding('class.x-buttons-not-border') get getNotBorder() {
    return this.notBorder;
  }

  private _default: XButtonsInput = {
    space: 0
  };
  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    this.renderer.addClass(this.elementRef.nativeElement, XButtonsPrefix);
  }

  ngOnInit() {
    fillDefault(this, this._default);
  }
}
