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
  TemplateRef
} from '@angular/core';
import { XCardPrefix, XCardShadow } from './card.type';
import { XInputBoolean, XSize, XInputNumber, XIsNumber } from '@ng-nest/ui/core';

@Component({
  selector: `${XCardPrefix}`,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCardComponent implements OnInit, OnChanges {
  @Input() width?: string;
  @Input() bodyStyle?: any;
  @Input() header?: TemplateRef<any>;
  @Input() shadow?: XCardShadow = 'always';
  @ViewChild('card', { static: true }) card: ElementRef;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setShadow();
  }

  ngOnChanges(simple: SimpleChanges) {}

  setShadow() {
    if (this.shadow) {
      this.renderer.addClass(this.card.nativeElement, `${XCardPrefix}-${this.shadow}`);
    }
  }
}
