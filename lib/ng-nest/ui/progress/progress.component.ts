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
  clipPath!: string;

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { status, percent, gradient, steps, type } = simples;
    XIsChange(type, status) && this.setClassMap();
    XIsChange(percent) && this.setColor();
    XIsChange(gradient) && this.setGradient();
    XIsChange(steps, percent) && this.setSteps();
    XIsChange(type, percent) && this.setType();
  }

  setClassMap() {
    this.classMap = {
      [`${XProgressPrefix}-${this.status}`]: true,
      [`${XProgressPrefix}-${this.type}`]: true,
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

  setType() {
    if (this.type === 'circle') {
      this.setClipPath();
    }
  }

  /**
   * circle 中的 100% 等于 clip-path 中的 400%
   */
  setClipPath() {
    let r = Number(this.percent) * 4;
    let k1 = 'polygon(50% 50%,50% 0%,';
    let k2 = k1 + '100% 0%,';
    let k3 = k2 + '100% 100%,';
    let k4 = k3 + '0% 100%,';
    let k5 = k4 + '0% 0%,';
    if (r <= 50) {
      r += 50;
      this.clipPath = `${k1}${r}% 0%)`;
    } else if (r > 50 && r <= 150) {
      r -= 50;
      this.clipPath = `${k2}100% ${r}%)`;
    } else if (r > 150 && r <= 250) {
      r = 250 - r;
      this.clipPath = `${k3}${r}% 100%)`;
    } else if (r > 250 && r <= 350) {
      r = 350 - r;
      this.clipPath = `${k4}0% ${r}%)`;
    } else if (r > 350 && r <= 400) {
      r -= 350;
      this.clipPath = `${k5}${r}% 0%)`;
    }
  }

  onFormat(percent: XNumber) {
    return this.format && this.format(percent);
  }
}
