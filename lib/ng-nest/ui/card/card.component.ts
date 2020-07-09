import { Component, OnInit, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { XCardPrefix, XCardProperty } from './card.property';
import { XIsEmpty, XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XCardPrefix}`,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCardComponent extends XCardProperty implements OnInit {
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

  setClassMap() {
    this.classMap[`${XCardPrefix}-${this.shadow}`] = !XIsEmpty(this.shadow);
  }
}
