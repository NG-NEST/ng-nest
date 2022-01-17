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
import {
  XIsFunction,
  XIsString,
  XIsObjectArray,
  XIsEmpty,
  XIsChange,
  XNumber,
  XConfigService,
  XIsNumber
} from '@ng-nest/ui/core';
import { XProgressColorNode } from './progress.property';

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
  circleClipPath!: string;
  dashboardClipPath!: string;
  dashboardRailClipPath!: string;
  subLinearGradient!: string;

  get maskWidth() {
    return XIsNumber(this.percent) ? 100 - Number(this.percent) : 100;
  }

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnChanges(simples: SimpleChanges) {
    const { status, percent, gradient, steps, type, notchAngle } = simples;
    XIsChange(type, status) && this.setClassMap();
    XIsChange(percent) && this.setColor();
    XIsChange(gradient) && this.setGradient();
    XIsChange(steps, percent) && this.setSteps();
    XIsChange(type, percent, notchAngle) && this.setType();
  }

  setClassMap() {
    this.classMap = {
      [`${XProgressPrefix}-${this.status}`]: true,
      [`${XProgressPrefix}-${this.type}`]: true,
      [`${XProgressPrefix}-inside`]: Boolean(this.inside)
    };
  }

  setColor() {
    if (this.subsection) {
      this.setSubLinearGradient();
    } else {
      if (XIsEmpty(this.color)) return;
      if (XIsString(this.color)) {
        this.currentColor = this.color as string;
      } else if (XIsObjectArray(this.color)) {
        this.currentColor = this.getLevelColor(this.percent);
      } else if (XIsFunction(this.color)) {
        this.currentColor = (this.color as Function)(this.percent);
      }
    }
  }

  getLevelColor(percent: XNumber) {
    let colors = (this.color as XProgressColorNode[]).sort((a, b) => a.percent - b.percent);
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].percent > Number(percent)) {
        return colors[i].color;
      }
    }
    return colors[colors.length - 1].color;
  }

  setGradient() {
    if (this.subsection) return;
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

  setSubLinearGradient() {
    let colors = this.color as XProgressColorNode[];
    if (!colors || colors.length <= 0) {
      this.subLinearGradient = `linear-gradient(to right, var(--x-primary) 0%, var(--x-primary) 100%)`;
      return;
    } else if (colors.length === 1) {
      colors.push({ percent: 100, color: 'var(--x-primary)' });
    }
    colors = colors.sort((a, b) => a.percent - b.percent);
    let lgs: string[] = [];
    colors.reduce((a, b, index) => {
      if (index === 1 && a.percent > 0) {
        lgs.push(`${a.color} 0%, ${a.color} ${a.percent}%`);
      }
      lgs.push(`${b.color} ${a.percent}%, ${b.color} ${b.percent}%`);
      if (index === colors.length - 1 && b.percent < 100) {
        lgs.push(`var(--x-primary) ${b.percent}%, var(--x-primary) 100%`);
      }
      return b;
    });
    this.subLinearGradient = `linear-gradient(to right,${lgs.join(',')})`;
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
      this.setCircleClipPath();
    } else if (this.type === 'dashboard') {
      this.setDashboardClipPath();
    }
  }

  /**
   * circle 中的 100% 等于 clip-path 中的 400%
   */
  setCircleClipPath() {
    let value = Number(this.percent) * 4;
    let k1 = 'polygon(50% 50%,50% 0%,';
    let k2 = k1 + '100% 0%,';
    let k3 = k2 + '100% 100%,';
    let k4 = k3 + '0% 100%,';
    let k5 = k4 + '0% 0%,';
    if (value <= 50) {
      value += 50;
      this.circleClipPath = `${k1}${value}% 0%)`;
    } else if (value > 50 && value <= 150) {
      value -= 50;
      this.circleClipPath = `${k2}100% ${value}%)`;
    } else if (value > 150 && value <= 250) {
      value = 250 - value;
      this.circleClipPath = `${k3}${value}% 100%)`;
    } else if (value > 250 && value <= 350) {
      value = 350 - value;
      this.circleClipPath = `${k4}0% ${value}%)`;
    } else if (value > 350 && value <= 400) {
      value -= 350;
      this.circleClipPath = `${k5}${value}% 0%)`;
    }
  }

  /**
   *
   * 90 polygon(50% 50%, 0% 100%, 0% 0%, 100% 0%, 100% 100%);
   * 180 polygon(50% 50%, 0% 50%, 0% 0%, 100% 0%, 100% 50%);
   * 270 polygon(50% 50%, 0% 0%, 100% 0%);
   */
  setDashboardClipPath() {
    let railValue = (Number(this.notchAngle) / 360) * 50 * 4;
    let k1 = `polygon(50% 50%,`;
    let start = '';
    let per = 0;
    if (railValue <= 50) {
      per = 50 - railValue;
      start = `${k1} ${per}% 100%`;
      this.dashboardRailClipPath = `${start}, 0% 100%, 0% 0%, 100% 0%, 100% 100%, ${100 - per}% 100%)`;
    } else if (railValue > 50 && railValue <= 150) {
      per = 150 - railValue;
      start = `${k1} 0% ${per}%`;
      this.dashboardRailClipPath = `${start}, 0% 0%, 100% 0%, 100% ${per}%)`;
    } else if (railValue > 150 && railValue <= 250) {
      per = railValue - 150;
      start = `${k1} ${per}% 0%`;
      this.dashboardRailClipPath = `${start}, ${100 - per}% 0%)`;
    }

    this.setCircleClipPathValue(start, railValue);
  }

  setCircleClipPathValue(start: string, railValue: number) {
    let value = ((400 - railValue * 2) / 100) * Number(this.percent);
    let val = value + railValue;
    if (val <= 50) {
      val = 50 - val;
      this.dashboardClipPath = `${start}, ${val}% 100%)`;
    } else if (val > 50 && val <= 150) {
      val = 150 - val;
      this.dashboardClipPath = `${start}, 0% 100%, 0% ${val}%)`;
    } else if (val > 150 && val <= 250) {
      val = val - 150;
      this.dashboardClipPath = `${start}, 0% 100%, 0% 0%, ${val}% 0%)`;
    } else if (val > 250 && val <= 350) {
      val = val - 250;
      this.dashboardClipPath = `${start}, 0% 100%, 0% 0%, 100% 0%, 100% ${val}%)`;
    } else if (val > 350 && val <= 400) {
      val = 100 - (val - 350);
      this.dashboardClipPath = `${start}, 0% 100%, 0% 0%, 100% 0%, 100% 100%, ${val}% 100%)`;
    }
  }

  onFormat(percent: XNumber) {
    return this.format && this.format(percent);
  }
}
