import { Component, OnInit, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { XResultPrefix, XResultProperty } from './result.property';
import { XIsEmpty, XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XResultPrefix}`,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XResultComponent extends XResultProperty implements OnInit {
  get strIcon() {
    return this.icon as string;
  }
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  setClassMap() {
    this.classMap[`${XResultPrefix}-${this.status}`] = !XIsEmpty(this.status);
  }
}
