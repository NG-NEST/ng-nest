import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { XButtonsPrefix, XButtonsProperty } from './button.property';

@Component({
  selector: `${XButtonsPrefix}`,
  template: '<ng-content></ng-content>',
  styleUrls: ['./buttons.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonsComponent extends XButtonsProperty {
  @HostBinding('class') className = XButtonsPrefix;
  @HostBinding('class.x-buttons-space') get getSpace() {
    return !!this.space();
  }
  @HostBinding('class.x-buttons-hiddenBorder') get getHiddenBorder() {
    return this.hiddenBorder();
  }
  @HostBinding('class.x-buttons-box-shadow') get getBoxShadow() {
    return this.boxShadow();
  }
  @HostBinding('class.x-buttons-round') get getRound() {
    return this.round();
  }
  @HostBinding('style.marginLeft') get getMarginLeft() {
    return '-' + this.space();
  }
  @HostBinding('style.marginRight') get getMarginRight() {
    return '-' + this.space();
  }
}
