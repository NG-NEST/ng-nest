import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  Input
} from '@angular/core';
import { XResultPrefix, XResultStatus } from './result.type';
import { XClassMap, XTemplate } from '@ng-nest/ui/core';

@Component({
  selector: `${XResultPrefix}`,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XResultComponent implements OnInit, OnChanges {
  @Input() status: XResultStatus = 'info';
  @Input() title: XTemplate;
  @Input() icon: XTemplate;
  @Input('sub-title') subTitle: XTemplate;
  classMap: XClassMap = {};

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(simple: SimpleChanges) {}

  setClassMap() {
    this.classMap[`${XResultPrefix}-${this.status}`] = this.status ? true : false;
  }
}
