import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  computed,
  viewChild
} from '@angular/core';
import { XTextareaPrefix, XTextareaProperty } from './textarea.property';
import { XIsEmpty, XConfigService, XIsFunction } from '@ng-nest/ui/core';
import { XValueAccessor } from '@ng-nest/ui/base-form';
import { NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XTextareaPrefix}`,
  imports: [NgClass, FormsModule, ReactiveFormsModule, XIconComponent, XOutletDirective],
  templateUrl: './textarea.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XTextareaComponent)]
})
export class XTextareaComponent extends XTextareaProperty {
  textareaRef = viewChild.required<ElementRef<HTMLElement>>('textareaRef');

  valueLength = computed(() => {
    if (this.maxlength()) {
      return XIsEmpty(this.value()) ? 0 : `${this.value()}`.length;
    }
    return 0;
  });
  lengthTotal = computed(() => {
    if (this.maxlength()) {
      return `${this.valueLength()}/${this.maxlength()}`;
    }
    return '';
  });

  clearShow = computed(() => {
    if (this.clearable() && !this.disabledComputed()) {
      return !XIsEmpty(this.value());
    } else {
      return false;
    }
  });

  getIcon = computed(() => !XIsEmpty(this.icon()));
  getIconLayoutLeft = computed(() => !XIsEmpty(this.icon()) && this.iconLayout() === 'left');
  getIconLayoutRight = computed(() => !XIsEmpty(this.icon()) && this.iconLayout() === 'right');
  paddingLeft = computed(() => (this.getIconLayoutLeft() ? 2.15 : 0.75));
  paddingRight = computed(() => (this.getIconLayoutRight() ? 2.15 : 0.75));

  configService = inject(XConfigService);

  classMap = computed(() => ({
    [`${XTextareaPrefix}-${this.size()}`]: !!this.size(),
    [`x-justify-${this.justify()}`]: !!this.justify(),
    [`x-align-${this.align()}`]: !!this.align(),
    [`x-direction-${this.direction()}`]: !!this.direction()
  }));
  labelMapSignal = computed(() => ({
    [`x-text-align-${this.labelAlign()}`]: !!this.labelAlign()
  }));

  change(value: any) {
    if (this.onChange) this.onChange(value);
    if (this.validatorComputed() && XIsFunction(this.inputValidator())) {
      this.invalidInputValidator.set(!this.inputValidator()!(value));
    }
  }

  onClear() {
    const clearValue = this.value();
    this.value.set('');
    this.change(this.value());
    this.clearEmit.emit(clearValue);
    this.textareaRef().nativeElement.focus();
  }
}
