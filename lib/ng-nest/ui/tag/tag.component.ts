import { Component, OnInit, ViewEncapsulation, Renderer2, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { XTagPrefix, XTagProperty } from './tag.property';
import { XIsEmpty } from '@ng-nest/ui/core';

@Component({
  selector: `${XTagPrefix}`,
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTagComponent extends XTagProperty implements OnInit {
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  setClassMap() {
    this.classMap = {
      [`${XTagPrefix}-${this.type}`]: !XIsEmpty(this.type),
      [`${XTagPrefix}-${this.size}`]: !XIsEmpty(this.size),
      [`${XTagPrefix}-dark`]: Boolean(this.dark)
    };
  }

  onClose() {
    this.close.emit();
  }
}
