import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges} from '@angular/core';
import { XTransferPrefix } from './transfer.type';
import { XClassMap } from '@ng-nest/ui/core';

@Component({
  selector: `${XTransferPrefix}`,
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTransferComponent implements OnInit, OnChanges {
  classMap: XClassMap = {};

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(simple: SimpleChanges) {}

  setClassMap() {
    // this.classMap[`${XTransferPrefix}-${this.shadow}`] = this.shadow ? true : false;
  }
}
