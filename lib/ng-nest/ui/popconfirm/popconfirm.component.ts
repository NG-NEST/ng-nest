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
  TemplateRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { XPlacement } from '@ng-nest/ui/core';
import { XPopoverTrigger } from '@ng-nest/ui/popover';

@Component({
  selector: 'x-popconfirm',
  templateUrl: './popconfirm.component.html',
  styleUrls: ['./popconfirm.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XPopconfirmComponent implements OnInit, OnChanges {
  @Input() title?: string | TemplateRef<void>;
  @Input() content?: string | TemplateRef<void>;
  @Input() placement?: XPlacement = 'bottom';
  @Input() trigger?: XPopoverTrigger = 'click';
  @Input() width?: string = '10rem';
  @Input() icon?: string = 'fto-help-circle';
  @Input() iconColor?: string = '#e6a23c';
  @Output() cancel = new EventEmitter();
  @Output() ok = new EventEmitter();
  @ViewChild('popconfirm', { static: true }) popconfirm: ElementRef;
  visible;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {}

  ngOnChanges(simple: SimpleChanges) {}

  onCancel() {
    this.visible = false;
    this.cancel.emit();
  }

  onOk() {
    this.visible = false;
    this.ok.emit();
  }
}
