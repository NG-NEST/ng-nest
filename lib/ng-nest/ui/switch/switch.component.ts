import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild,
  SimpleChanges,
  inject,
  OnChanges
} from '@angular/core';
import { XSwitchProperty, XSwitchPrefix } from './switch.property';
import { XClearClass, XConfigService, XIsChange } from '@ng-nest/ui/core';
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
export class XSwitchComponent extends XSwitchProperty implements OnInit, OnChanges {
  @ViewChild('switch', { static: true }) switch!: ElementRef<HTMLElement>;

  override writeValue(value: any) {
    this.value = value;
    this.cdr.detectChanges();
  }
  private renderer = inject(Renderer2);
  override cdr = inject(ChangeDetectorRef);
  configService = inject(XConfigService);

  ngOnChanges(changes: SimpleChanges): void {
    const { size, labelAlign } = changes;
    XIsChange(size, labelAlign) && this.setClassMap();
  }

  ngOnInit() {
    this.setFlex(this.switch.nativeElement, this.renderer, this.justify, this.align, this.direction);
    this.setClassMap();
  }

  setClassMap() {
    XClearClass(this.classMap, this.labelMap);
    this.classMap[`${XSwitchPrefix}-${this.size}`] = this.size ? true : false;
    this.labelMap[`x-text-align-${this.labelAlign}`] = this.labelAlign ? true : false;
  }

  switchClick() {
    if (this.disabled || this.loading || this.manual) return;
    this.value = !this.value;
    if (this.onChange) this.onChange(this.value);
    this.cdr.detectChanges();
  }

  formControlChanges() {
    this.ngOnInit();
    this.cdr.detectChanges();
  }
}
