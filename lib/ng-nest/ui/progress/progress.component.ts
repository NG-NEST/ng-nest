import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed } from '@angular/core';
import { XProgressPrefix, XProgressProperty } from './progress.property';
import { XIsFunction, XIsString, XIsObjectArray, XIsEmpty, XIsNumber } from '@ng-nest/ui/core';
import { XProgressColorNode } from './progress.property';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import type { XNumber } from '@ng-nest/ui/core';

@Component({
  selector: `${XProgressPrefix}`,
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, FormsModule, XIconComponent],
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XProgressComponent extends XProgressProperty {
  maskWidth = computed(() => (XIsNumber(this.percent()) ? 100 - this.percent() : 100));

  classMapSignal = computed(() => ({
    [`${XProgressPrefix}-${this.status()}`]: true,
    [`${XProgressPrefix}-${this.type()}`]: true,
    [`${XProgressPrefix}-inside`]: this.inside()
  }));

  stepsArray = computed(() => {
    const steps = this.steps();
    if (XIsEmpty(steps)) {
      return [];
    } else {
      const critical = Math.ceil((this.percent() / 100) * steps!);
      return Array.from({ length: steps! }).map((_, index) => index + 1 <= critical);
    }
  });

  currentColor = computed(() => {
    if (this.subsection()) return '';
    const color = this.color();
    if (XIsEmpty(color)) return '';
    if (XIsString(color)) {
      return color;
    } else if (XIsObjectArray(color)) {
      return this.getLevelColor(this.percent(), color as XProgressColorNode[]);
    } else if (XIsFunction(color)) {
      return (color as Function)(this.percent());
    }
  });

  linearGradient = computed(() => {
    if (this.subsection()) return '';
    if (XIsEmpty(this.gradient())) {
      return '';
    } else {
      const { from, to, direction = 'to right', ...percents } = this.gradient() || {};
      if (Object.keys(percents).length !== 0) {
        return `linear-gradient(${direction}, ${this.sortGradient(percents as { [percent: string]: string }).map(
          ({ key, value }) => `${value} ${key}%`
        )})`;
      }
      return `linear-gradient(${direction}, ${from}, ${to})`;
    }
  });

  /**
   * circle 中的 100% 等于 clip-path 中的 400%
   */
  circleClipPath = computed(() => {
    if (this.type() !== 'circle') return '';
    let value = this.percent() * 4;
    let k1 = 'polygon(50% 50%,50% 0%,';
    let k2 = k1 + '100% 0%,';
    let k3 = k2 + '100% 100%,';
    let k4 = k3 + '0% 100%,';
    let k5 = k4 + '0% 0%,';
    if (value <= 50) {
      value += 50;
      return `${k1}${value}% 0%)`;
    } else if (value > 50 && value <= 150) {
      value -= 50;
      return `${k2}100% ${value}%)`;
    } else if (value > 150 && value <= 250) {
      value = 250 - value;
      return `${k3}${value}% 100%)`;
    } else if (value > 250 && value <= 350) {
      value = 350 - value;
      return `${k4}0% ${value}%)`;
    } else if (value > 350 && value <= 400) {
      value -= 350;
      return `${k5}${value}% 0%)`;
    }
    return '';
  });

  railValue = computed(() => {
    if (this.type() !== 'dashboard') return 0;
    return (this.notchAngle() / 360) * 50 * 4;
  });

  dashboardStart = computed(() => {
    if (this.type() !== 'dashboard') return '';
    let k1 = `polygon(50% 50%,`;
    let per = 0;
    let railValue = this.railValue();
    if (railValue <= 50) {
      per = 50 - railValue;
      return `${k1} ${per}% 100%`;
    } else if (railValue > 50 && railValue <= 150) {
      per = 150 - railValue;
      return `${k1} 0% ${per}%`;
    } else if (railValue > 150 && railValue <= 250) {
      per = railValue - 150;
      return `${k1} ${per}% 0%`;
    }
    return '';
  });

  /**
   *
   * 90 polygon(50% 50%, 0% 100%, 0% 0%, 100% 0%, 100% 100%);
   * 180 polygon(50% 50%, 0% 50%, 0% 0%, 100% 0%, 100% 50%);
   * 270 polygon(50% 50%, 0% 0%, 100% 0%);
   */
  dashboardRailClipPath = computed(() => {
    if (this.type() !== 'dashboard') return '';
    let start = this.dashboardStart();
    let per = 0;
    let railValue = this.railValue();
    if (railValue <= 50) {
      per = 50 - railValue;
      return `${start}, 0% 100%, 0% 0%, 100% 0%, 100% 100%, ${100 - per}% 100%)`;
    } else if (railValue > 50 && railValue <= 150) {
      per = 150 - railValue;
      return `${start}, 0% 0%, 100% 0%, 100% ${per}%)`;
    } else if (railValue > 150 && railValue <= 250) {
      per = railValue - 150;
      return `${start}, ${100 - per}% 0%)`;
    }
    return '';
  });

  dashboardClipPath = computed(() => {
    if (this.type() !== 'dashboard') return '';
    return this.setCircleClipPathValue(this.dashboardStart(), this.railValue());
  });

  subLinearGradient = computed(() => {
    if (!this.subsection()) return '';
    let colors = this.color() as XProgressColorNode[];
    if (!colors || colors.length <= 0) {
      return `linear-gradient(to right, var(--x-primary) 0%, var(--x-primary) 100%)`;
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
    return `linear-gradient(to right,${lgs.join(',')})`;
  });

  getLevelColor(percent: XNumber, color: XProgressColorNode[]) {
    let colors = color.sort((a, b) => a.percent - b.percent);
    for (let i = 0; i < colors.length; i++) {
      if (colors[i].percent > Number(percent)) {
        return colors[i].color;
      }
    }
    return colors[colors.length - 1].color;
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

  setCircleClipPathValue(start: string, railValue: number) {
    let value = ((400 - railValue * 2) / 100) * this.percent();
    let val = value + railValue;
    if (val <= 50) {
      val = 50 - val;
      return `${start}, ${val}% 100%)`;
    } else if (val > 50 && val <= 150) {
      val = 150 - val;
      return `${start}, 0% 100%, 0% ${val}%)`;
    } else if (val > 150 && val <= 250) {
      val = val - 150;
      return `${start}, 0% 100%, 0% 0%, ${val}% 0%)`;
    } else if (val > 250 && val <= 350) {
      val = val - 250;
      return `${start}, 0% 100%, 0% 0%, 100% 0%, 100% ${val}%)`;
    } else if (val > 350 && val <= 400) {
      val = 100 - (val - 350);
      return `${start}, 0% 100%, 0% 0%, 100% 0%, 100% 100%, ${val}% 100%)`;
    }
    return '';
  }
}
