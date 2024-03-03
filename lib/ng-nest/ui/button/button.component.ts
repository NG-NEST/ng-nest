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
  inject,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { XIsChange, XConfigService, XIsEmpty, XClearClass } from '@ng-nest/ui/core';
import { delay, of } from 'rxjs';
import { XButtonPrefix, XButtonProperty } from './button.property';
import { XButtonsComponent } from './buttons.component';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XRippleDirective } from '@ng-nest/ui/ripple';
import { NgClass } from '@angular/common';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: `${XButtonPrefix}`,
  standalone: true,
  imports: [NgClass, XIconComponent, XRippleDirective],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonComponent extends XButtonProperty implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  transition = false;
  @ViewChild('buttonRef', { static: true }) buttonRef!: ElementRef;

  private buttons = inject(XButtonsComponent, { optional: true, host: true });
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private focusMontitor = inject(FocusMonitor);
  configService = inject(XConfigService);

  ngOnInit(): void {
    this.setSpace();
    this.setRound();
    this.setClassMap();
  }

  ngAfterViewInit() {
    this.focusMontitor.monitor(this.buttonRef, true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { loading, disabled, activated, type, plain, size, direction } = changes;
    XIsChange(loading, disabled) && this.setDisabled();
    XIsChange(activated) && this.cdr.detectChanges();
    XIsChange(type, plain, size, direction) && this.setClassMap();
  }

  ngOnDestroy() {
    this.focusMontitor.stopMonitoring(this.buttonRef);
  }

  setClassMap() {
    XClearClass(this.classMap);
    this.classMap = {
      [`${XButtonPrefix}-${this.type}`]: !XIsEmpty(this.type) && XIsEmpty(this.plain),
      [`${XButtonPrefix}-${this.type}-plain`]: !XIsEmpty(this.type) && !XIsEmpty(this.plain),
      [`${XButtonPrefix}-${this.type}-text`]: !XIsEmpty(this.type) && !XIsEmpty(this.text),
      [`${XButtonPrefix}-${this.type}-flat`]: !XIsEmpty(this.type) && !XIsEmpty(this.flat),
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

  setRound() {
    if (!this.buttons?.round) return;
    if (this.round === undefined) {
      this.round = true;
    }
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
