import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild
} from '@angular/core';
import { XTextRetractPrefix } from './text-retract.type';
import { XInputNumber } from '@ng-nest/ui/core';

@Component({
  selector: `${XTextRetractPrefix}`,
  templateUrl: './text-retract.component.html',
  styleUrls: ['./text-retract.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTextRetractComponent implements OnInit {
  @Input() label?: string;
  @Input() @XInputNumber() max: number = 256;
  @ViewChild('textRetract', { static: true }) textRetract: ElementRef;
  displayValue: string;
  retract: boolean = false;
  unfold: boolean = true;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setDisplayValue();
  }

  setDisplayValue() {
    if (this.label && this.label.length > this.max) {
      this.displayValue = this.label.substring(0, this.max);
      this.retract = true;
    } else {
      this.displayValue = this.label;
    }
    this.cdr.markForCheck();
  }

  toggle() {
    this.unfold = !this.unfold;
    if (this.unfold) {
      this.displayValue = this.label.substring(0, this.max);
    } else {
      this.displayValue = this.label;
    }
    this.cdr.detectChanges();
  }
}
