import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  inject
} from '@angular/core';
import { XSkeletonPrefix, XSkeletonProperty } from './skeleton.property';
import { XIsChange, XConfigService } from '@ng-nest/ui/core';
import { NgClass, NgStyle } from '@angular/common';
import { XColComponent, XRowComponent } from '@ng-nest/ui/layout';

@Component({
  selector: `${XSkeletonPrefix}`,
  standalone: true,
  imports: [NgClass, NgStyle, XRowComponent, XColComponent],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XSkeletonComponent extends XSkeletonProperty implements OnInit, OnChanges {
  private cdr = inject(ChangeDetectorRef);
  configService = inject(XConfigService);

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { loading } = changes;
    XIsChange(loading) && this.cdr.markForCheck();
  }

  setClassMap() {
    this.classMap = {
      [`${XSkeletonPrefix}-active`]: Boolean(this.active),
      [`${XSkeletonPrefix}-border`]: Boolean(this.border)
    };
    this.cdr.markForCheck();
  }
}
