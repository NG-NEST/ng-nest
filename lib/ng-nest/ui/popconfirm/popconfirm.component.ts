import { Renderer2, ElementRef, ChangeDetectorRef, Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { XPopconfirmProperty, XPopconfirmPrefix } from './popconfirm.property';

@Component({
  selector: `${XPopconfirmPrefix}`,
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPopconfirmComponent extends XPopconfirmProperty {
  visible: boolean;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  onCancel() {
    this.visible = false;
    this.cancel.emit();
  }

  onConfirm() {
    this.visible = false;
    this.confirm.emit();
  }
}
