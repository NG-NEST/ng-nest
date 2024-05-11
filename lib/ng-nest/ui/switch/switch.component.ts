import { Component, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, viewChild, computed } from '@angular/core';
import { XSwitchProperty, XSwitchPrefix } from './switch.property';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XSwitchPrefix}`,
  standalone: true,
  imports: [NgClass, FormsModule, ReactiveFormsModule, XLoadingComponent, XOutletDirective],
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSwitchComponent)]
})
export class XSwitchComponent extends XSwitchProperty {
  switch = viewChild.required<ElementRef<HTMLElement>>('switch');

  classMapSignal = computed(() => ({
    [`${XSwitchPrefix}-${this.size()}`]: !!this.size(),
    [`x-justify-${this.justify()}`]: !!this.justify(),
    [`x-align-${this.align()}`]: !!this.align(),
    [`x-direction-${this.direction()}`]: !!this.direction()
  }));
  labelMapSignal = computed(() => ({
    [`x-text-align-${this.labelAlign()}`]: !!this.labelAlign()
  }));

  override writeValue(value: any) {
    this.value.set(value);
  }

  switchClick() {
    if (this.disabled() || this.loading() || this.manual()) return;
    this.value.update((x) => !x);
    if (this.onChange) this.onChange(this.value());
  }

  formControlChanges() {}
}
