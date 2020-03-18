import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XSkeletonPrefix, XSkeletonRow } from './skeleton.type';
import { XClassMap, XInputBoolean, XIsChange, XIsEmpty } from '@ng-nest/ui/core';

@Component({
  selector: `${XSkeletonPrefix}`,
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSkeletonComponent implements OnInit, OnChanges {
  @Input() data: XSkeletonRow[] = [
    { cols: [{ width: '10rem', type: 'title' }] },
    { cols: [{}] },
    { cols: [{}] },
    { cols: [{ span: 16 }] }
  ];
  @Input() @XInputBoolean() loading: boolean = true;
  @Input() @XInputBoolean() active?: boolean;
  @Input() @XInputBoolean() border?: boolean;
  classMap: XClassMap = {};

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.loading) && this.setLoading();
  }

  setClassMap() {
    this.classMap[`${XSkeletonPrefix}-active`] = this.active;
    this.classMap[`${XSkeletonPrefix}-border`] = this.border;
    this.cdr.markForCheck();
  }

  setLoading() {
    this.cdr.markForCheck();
  }
}
