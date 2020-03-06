import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { XTagPrefix } from './tag.type';
import { XTemplate, XType, XClassMap, XSize, XInputBoolean } from '@ng-nest/ui/core';

@Component({
  selector: `${XTagPrefix}`,
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTagComponent implements OnInit {
  @Input() type?: XType;
  @Input() size?: XSize;
  @Input() @XInputBoolean() closeable?: boolean;
  @Input() @XInputBoolean() dark?: boolean;
  @Output() close = new EventEmitter();
  @ViewChild('tag', { static: true }) tag: ElementRef;
  classMap: XClassMap = {};

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  setClassMap() {
    this.classMap[`${XTagPrefix}-${this.type}`] = this.type ? true : false;
    this.classMap[`${XTagPrefix}-${this.size}`] = this.size ? true : false;
    this.classMap[`${XTagPrefix}-dark`] = this.dark;
  }

  onClose() {
    this.close.emit();
  }
}
