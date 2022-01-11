import {
  Component,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { XProgressPrefix, XProgressProperty } from './progress.property';
import { XIsFunction, XIsString, XIsObjectArray, XIsEmpty, XIsChange, XNumber, XConfigService } from '@ng-nest/ui/core';

@Component({
  selector: `${XProgressPrefix}`,
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XProgressComponent extends XProgressProperty implements OnChanges {
  currentColor!: string;
  linearGradient!: string;
  stepsArray: Array<boolean> = [];

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { status, percent, gradient, steps } = simples;
    XIsChange(status) && this.setClassMap();
    XIsChange(percent) && this.setColor();
    XIsChange(gradient) && this.setGradient();
    XIsChange(steps, percent) && this.setSteps();
  }

  setClassMap() {
    this.classMap = {
      [`${XProgressPrefix}-${this.status}`]: true,
      [`${XProgressPrefix}-inside`]: Boolean(this.inside)
    };
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

  getLevelColor(percent: XNumber) {
    let colors = (this.color as { color: string; percent: number }[]).sort((a, b) => a.percent - b.percent);
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].percent > Number(percent)) {
        return colors[i].color;
      }
    }
    return colors[colors.length - 1].color;
  }

  setGradient() {
    if (XIsEmpty(this.gradient)) {
      this.linearGradient = '';
    } else {
      const { from, to, direction = 'to right', ...percents } = this.gradient || {};
      if (Object.keys(percents).length !== 0) {
        this.linearGradient = `linear-gradient(${direction}, ${this.sortGradient(percents as { [percent: string]: string }).map(
          ({ key, value }) => `${value} ${key}%`
        )})`;
        return;
      }
      this.linearGradient = `linear-gradient(${direction}, ${from}, ${to})`;
    }
    console.log(this.linearGradient);
  }

  sortGradient(percents: { [percent: string]: string }) {
    let arr: { key: number; value: string }[] = [];
    Object.keys(percents).forEach((key) => {
      const value = percents[key];
      const numKey = +key.replace('%', '');
      if (!isNaN(numKey)) {
        arr.push({ key: numKey, value });
      }
    });
    return arr.sort((a, b) => a.key - b.key);
  }

  setSteps() {
    if (XIsEmpty(this.steps)) {
      this.stepsArray = [];
    } else {
      const critical = Math.ceil((Number(this.percent) / 100) * this.steps!);
      this.stepsArray = Array.from({ length: this.steps as number }).map((_, index) => index + 1 <= critical);
    }
  }

  onFormat(percent: XNumber) {
    return this.format && this.format(percent);
  }
}
