import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XSkeletonPrefix, XSkeletonProperty } from './skeleton.property';
import { XIsChange, XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XSkeletonPrefix}`,
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSkeletonComponent extends XSkeletonProperty implements OnInit, OnChanges {
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.loading) && this.cdr.markForCheck();
  }

  setClassMap() {
    this.classMap = {
      [`${XSkeletonPrefix}-active`]: Boolean(this.active),
      [`${XSkeletonPrefix}-border`]: Boolean(this.border)
    };
    this.cdr.markForCheck();
  }
}
