import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { XAlertPrefix, XAlertType } from './alert.type';
import { XClassMap, XTemplate, XInputBoolean, XEffect, XFadeAnimation } from '@ng-nest/ui/core';

@Component({
  selector: `${XAlertPrefix}`,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [XFadeAnimation]
})
export class XAlertComponent implements OnInit {
  @Input() label?: XTemplate;
  @Input() description?: XTemplate;
  @Input() type?: XAlertType = 'info';
  @Input() @XInputBoolean() dark?: boolean;
  @Input() effect?: XEffect = 'light';
  @Input('hide-close') @XInputBoolean() hideClose?: boolean;
  @Input('close-text') closeText?: string;
  @Input('show-icon') @XInputBoolean() showIcon?: boolean;
  @Output() close = new EventEmitter();
  fade = false;
  classMap: XClassMap = {};

  constructor(public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  setClassMap() {
    this.classMap[`${XAlertPrefix}-${this.type}`] = this.type ? true : false;
    this.classMap[`x-${this.effect}`] = this.effect ? true : false;
    this.classMap[`${XAlertPrefix}-icon-medium`] = this.label && this.description && this.showIcon;
  }

  onClose() {
    this.fade = true;
    this.close.emit();
    this.cdr.detectChanges();
  }
}
