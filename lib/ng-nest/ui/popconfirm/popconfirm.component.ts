import {
  OnInit,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { XPlacement, XTemplate } from '@ng-nest/ui/core';
import { XPopoverTrigger } from '@ng-nest/ui/popover';

@Component({
  selector: 'x-popconfirm',
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPopconfirmComponent implements OnInit, OnChanges {
  @Input() title?: XTemplate;
  @Input() content?: XTemplate;
  @Input() placement?: XPlacement = 'bottom';
  @Input() trigger?: XPopoverTrigger = 'click';
  @Input() width?: string = '10rem';
  @Input() icon?: string = 'fto-help-circle';
  @Input() iconColor?: string = '#e6a23c';
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();
  @ViewChild('popconfirm', { static: true }) popconfirm: ElementRef;
  visible;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {}

  onCancel() {
    this.visible = false;
    this.cancel.emit();
  }

  onConfirm() {
    this.visible = false;
    this.confirm.emit();
  }
}
