import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { XInnerPrefix, XInnerProperty } from './inner.property';

@Component({
  selector: `${XInnerPrefix}`,
  templateUrl: './inner.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XInnerComponent extends XInnerProperty implements OnInit, OnChanges {
  private _ele: HTMLElement;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
    super();
    this.renderer.addClass(this.elementRef.nativeElement, XInnerPrefix);
    this._ele = this.elementRef.nativeElement;
  }

  ngOnInit() {
    this.setStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setStyle();
  }

  setStyle() {
    this.renderer.setStyle(this._ele, 'padding', this.padding);
  }
}
