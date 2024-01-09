import {
  Component,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SimpleChanges,
  ChangeDetectorRef,
  ElementRef,
  Renderer2,
  ViewChild,
  inject
} from '@angular/core';
import { XIsChange, XConfigService, XIsEmpty, XClearClass } from '@ng-nest/ui/core';
import { delay, of } from 'rxjs';
import { XButtonPrefix, XButtonProperty } from './button.property';
import { XButtonsComponent } from './buttons.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XRippleDirective } from '@ng-nest/ui/ripple';
import { NgClass } from '@angular/common';

@Component({
  selector: `${XButtonPrefix}`,
  standalone: true,
  imports: [NgClass, XIconComponent, XRippleDirective],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonComponent extends XButtonProperty implements OnInit, OnChanges {
  transition = false;
  @ViewChild('buttonRef', { static: true }) buttonRef!: ElementRef;

  private buttons = inject(XButtonsComponent, { optional: true, host: true });
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  configService = inject(XConfigService);

  ngOnInit(): void {
    this.setSpace();
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { loading, disabled, activated, type, plain, size, direction } = changes;
    XIsChange(loading, disabled) && this.setDisabled();
    XIsChange(activated) && this.cdr.detectChanges();
    XIsChange(type, plain, size, direction) && this.setClassMap();
  }

  setClassMap() {
    XClearClass(this.classMap);
    this.classMap = {
      [`${XButtonPrefix}-${this.type}`]: !XIsEmpty(this.type) && XIsEmpty(this.plain),
      [`${XButtonPrefix}-${this.type}-plain`]: !XIsEmpty(this.type) && !XIsEmpty(this.plain),
      [`${XButtonPrefix}-plain`]: XIsEmpty(this.type) && !XIsEmpty(this.plain),
      [`x-size-${this.size}`]: !XIsEmpty(this.size),
      [`x-direction-${this.direction}`]: !XIsEmpty(this.direction)
    };
    if (!this.transition)
      of(true)
        .pipe(delay(0))
        .subscribe(() => {
          this.transition = true;
          this.cdr.detectChanges();
        });
    this.cdr.detectChanges();
  }

  setSpace() {
    if (!this.buttons?.space) return;
    this.renderer.setStyle(this.elementRef.nativeElement, 'margin-left', `${Number(this.buttons.space) / 2}rem`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'margin-right', `${Number(this.buttons.space) / 2}rem`);
  }

  setDisabled() {
    if (this.loading || this.disabled) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'pointer-events', 'none');
      this.renderer.setStyle(this.buttonRef?.nativeElement, 'disabled', 'none');
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'pointer-events');
      this.renderer.removeStyle(this.buttonRef?.nativeElement, 'disabled');
    }
    this.cdr.detectChanges();
  }
}
