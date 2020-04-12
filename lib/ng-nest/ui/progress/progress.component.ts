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
import { XProgressPrefix, XProgressProperty } from './progress.property';
import { XIsFunction, XIsString, XIsObjectArray, XIsEmpty, XIsChange } from '@ng-nest/ui/core';

@Component({
  selector: `${XProgressPrefix}`,
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XProgressComponent extends XProgressProperty implements OnInit, OnChanges {
  currentColor: string;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {}

  ngOnChanges(simples: SimpleChanges) {
    XIsChange(simples.status) && this.setClassMap();
    XIsChange(simples.percent) && this.setColor();
  }

  setClassMap() {
    this.classMap[`${XProgressPrefix}-${this.status}`] = true;
    this.classMap[`${XProgressPrefix}-inside`] = this.inside;
  }

  setColor() {
    if (XIsEmpty(this.color)) return;
    if (XIsString(this.color)) {
      this.currentColor = this.color as string;
    } else if (XIsObjectArray(this.color)) {
      this.currentColor = this.getLevelColor(this.percent);
    } else if (XIsFunction(this.color)) {
      this.currentColor = (this.color as Function)(this.percent);
    }
  }

  getLevelColor(percent: number) {
    let colors = (this.color as { color: string; percent: number }[]).sort((a, b) => a.percent - b.percent);
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].percent > percent) {
        return colors[i].color;
      }
    }
    return colors[colors.length - 1].color;
  }

  onFormat(percent: number) {
    return this.format?.(percent);
  }
}
