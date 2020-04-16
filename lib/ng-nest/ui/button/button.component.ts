import {
  Component,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SimpleChanges,
  ChangeDetectorRef,
  AfterViewInit,
  Optional,
  Host,
  ElementRef,
  Renderer2
} from '@angular/core';
import { XIsChange, XIsEmpty } from '@ng-nest/ui/core';
import { XButtonPrefix, XButtonProperty } from './button.property';
import { XButtonsComponent } from './buttons.component';

@Component({
  selector: `${XButtonPrefix}`,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonComponent extends XButtonProperty implements OnInit, OnChanges, AfterViewInit {
  constructor(
    @Optional() @Host() private buttons: XButtonsComponent,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    super();
  }

  ngOnInit(): void {
    this.setSpace();
    this.setClassMap();
  }

  ngAfterViewInit() {
    // this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (XIsChange(changes.loading)) this.disabled = this.loading;
    XIsChange(changes.disabled, changes.activated) && this.cdr.detectChanges();
  }

  setClassMap() {
    this.classMap = {
      [`${XButtonPrefix}-${this.type}`]: !XIsEmpty(this.type) && XIsEmpty(this.plain),
      [`${XButtonPrefix}-${this.type}-plain`]: !XIsEmpty(this.type) && !XIsEmpty(this.plain),
      [`${XButtonPrefix}-plain`]: XIsEmpty(this.type) && !XIsEmpty(this.plain),
      [`x-size-${this.size}`]: !XIsEmpty(this.size),
      [`x-direction-${this.direction}`]: !XIsEmpty(this.direction)
    };
    this.cdr.detectChanges();
  }

  setSpace() {
    if (!this.buttons?.space) return;
    this.renderer.setStyle(this.elementRef.nativeElement, 'margin-left', `${this.buttons.space / 2}rem`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'margin-right', `${this.buttons.space / 2}rem`);
  }
}
