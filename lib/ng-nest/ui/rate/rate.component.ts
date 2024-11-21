import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  viewChild,
  computed,
  signal
} from '@angular/core';
import { XIsEmpty, XIsString, XIsObject } from '@ng-nest/ui/core';
import { XRatePrefix, XRateProperty } from './rate.property';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: `${XRatePrefix}`,
  imports: [NgClass, NgTemplateOutlet, FormsModule, XIconComponent],
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XRateComponent)]
})
export class XRateComponent extends XRateProperty {
  rate = viewChild.required<ElementRef<HTMLElement>>('rate');
  rates = computed(() =>
    Array(this.count())
      .fill(0)
      .map((_, i) => i + 1)
  );
  hoverActivated = signal(0);
  hoverHalfActivated = signal(0);

  getColor = computed(() => {
    let result = '';
    const color = this.color();
    if (XIsString(color)) {
      result = color as string;
    } else if (XIsObject(color)) {
      let val = this.half()
        ? (Math.floor(this.hoverActivated()) + this.hoverHalfActivated()) * 0.5
        : this.hoverActivated();
      for (let key in color) {
        if (color[key](val)) {
          result = key;
          break;
        }
      }
    }
    return result;
  });

  classMap = computed(() => ({
    [`x-justify-${this.justify()}`]: !!this.justify(),
    [`x-align-${this.align()}`]: !!this.align(),
    [`x-direction-${this.direction()}`]: !!this.direction()
  }));
  labelMapSignal = computed(() => ({
    [`x-text-align-${this.labelAlign()}`]: !!this.labelAlign()
  }));

  override requiredIsEmpty = computed(() => {
    return this.validatorComputed() && this.requiredComputed() && (XIsEmpty(this.value()) || this.value() === 0);
  });

  override writeValue(value: any) {
    if (XIsEmpty(value)) value = 0;
    this.value.set(value);
    this.hoverActivated.set(value);
    this.hoverHalfActivated.set(Math.ceil(value));
  }

  rateHover(rate: number, _event: MouseEvent) {
    if (this.disabledComputed()) return;
    this.hoverActivated.set(rate);
  }

  leaveRates() {
    if (this.disabledComputed()) return;
    const activited = this.value();
    this.hoverActivated.set(activited);
    this.hoverHalfActivated.set(Math.ceil(activited));
  }

  rateClick(rate: number, _event: MouseEvent) {
    if (this.disabledComputed()) return;
    this.formControlValidator();
    this.value.update((x) => (x === rate ? 0 : rate));
    if (this.onChange) this.onChange(this.value());
  }

  rateHalfHover(rate: number, _event: MouseEvent) {
    if (this.disabledComputed()) return;
    this.formControlValidator();
    this.hoverActivated.set(rate - 1);
    this.hoverHalfActivated.set(rate);
  }

  rateHalfClick(rate: number, _event: MouseEvent) {
    if (this.disabledComputed()) return;
    this.value.set(rate - 0.5);
    if (this.onChange) this.onChange(this.value());
  }

  formControlChanges() {}
}
