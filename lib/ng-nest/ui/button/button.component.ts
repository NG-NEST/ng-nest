import {
  Component,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  SimpleChanges,
  ChangeDetectorRef,
  Optional,
  Host,
  ElementRef,
  Renderer2
} from '@angular/core';
import { XIsChange, XConfigService, XIsEmpty, XClearClass } from '@ng-nest/ui/core';
import { delay, of } from 'rxjs';
import { XButtonPrefix, XButtonProperty } from './button.property';
import { XButtonsComponent } from './buttons.component';

@Component({
  selector: `${XButtonPrefix}`,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XButtonComponent extends XButtonProperty implements OnInit, OnChanges {
  transition = false;
  constructor(
    @Optional() @Host() public buttons: XButtonsComponent,
    public cdr: ChangeDetectorRef,
    public elementRef: ElementRef,
    public renderer: Renderer2,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit(): void {
    this.setSpace();
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { loading, disabled, activated, type, plain, size, direction } = changes;
    if (XIsChange(loading)) this.disabled = this.loading;
    XIsChange(disabled, activated) && this.cdr.detectChanges();
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
}
