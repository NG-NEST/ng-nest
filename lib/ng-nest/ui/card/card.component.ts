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
  SimpleChanges,
  OnChanges,
  TemplateRef
} from '@angular/core';
import { XCardPrefix, XCardShadow } from './card.type';
import { XClassMap } from '@ng-nest/ui/core';

@Component({
  selector: `${XCardPrefix}`,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCardComponent implements OnInit, OnChanges {
  @Input() width?: string;
  @Input() bodyStyle?: any = {};
  @Input() header?: TemplateRef<any>;
  @Input() shadow?: XCardShadow = 'always';
  @ViewChild('card', { static: true }) card: ElementRef;
  classMap: XClassMap = {};

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(simple: SimpleChanges) {}

  setClassMap() {
    this.classMap[`${XCardPrefix}-${this.shadow}`] = this.shadow ? true : false;
  }
}
