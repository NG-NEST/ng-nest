import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { XTextRetractPrefix, XTextRetractProperty } from './text-retract.property';
import { XIsChange } from '@ng-nest/ui/core';

@Component({
  selector: `${XTextRetractPrefix}`,
  templateUrl: './text-retract.component.html',
  styleUrls: ['./text-retract.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTextRetractComponent extends XTextRetractProperty implements OnInit, OnChanges {
  displayValue: string;
  retract: boolean = false;
  unfold: boolean = true;

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setDisplayValue();
  }

  ngOnChanges(changes: SimpleChanges) {
    XIsChange(changes.content) && this.setDisplayValue();
  }

  setDisplayValue() {
    if (this.content && this.content.length > this.max) {
      this.displayValue = this.content.substring(0, Number(this.max));
      this.retract = true;
    } else {
      this.displayValue = this.content;
    }
    this.cdr.markForCheck();
  }

  toggle() {
    this.unfold = !this.unfold;
    if (this.unfold) {
      this.displayValue = this.content.substring(0, Number(this.max));
    } else {
      this.displayValue = this.content;
    }
    this.cdr.detectChanges();
  }
}
