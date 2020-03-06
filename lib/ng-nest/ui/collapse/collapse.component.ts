import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { XCollapsePrefix } from './collapse.type';
import { XInputBoolean, XIsArray } from '@ng-nest/ui/core';

@Component({
  selector: `${XCollapsePrefix}`,
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCollapseComponent implements OnInit, OnChanges {
  @Input() @XInputBoolean() accordion?: boolean;
  @Input() active: number | number[] = [];
  @ViewChild('collapse', { static: true }) collapse: ElementRef;
  @Output() activeChange = new EventEmitter();
  start: number = 0;
  panelChanges: Function[] = [];

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!XIsArray(this.active)) this.active = [Number(this.active)];
  }

  ngOnChanges(simple: SimpleChanges) {}

  ngAfterViewInit() {}

  change(num: number, add = true) {
    this.active = this.active as number[];
    let i = this.active.indexOf(num);
    if (i === -1) {
      if (add) {
        this.active = [...this.active, num];
      }
    } else {
      if (!add) {
        this.active.splice(i, 1);
      }
    }
    if (this.accordion && this.active.length === 2) {
      this.panelChanges[this.active[0]]();
      return;
    }
    this.activeChange.emit(this.active);
  }
}
