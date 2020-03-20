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
import { XAffixPrefix } from './affix.type';
import { XClassMap } from '@ng-nest/ui/core';

@Component({
  selector: `${XAffixPrefix}`,
  templateUrl: './affix.component.html',
  styleUrls: ['./affix.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAffixComponent implements OnInit, OnChanges {
  @Input('offset-top') offsetTop: string = '0';
  classMap: XClassMap = {};

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(simple: SimpleChanges) {}

  setClassMap() {
    // this.classMap[`${XAffixPrefix}-${this.shadow}`] = this.shadow ? true : false;
  }
}
