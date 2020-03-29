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
  HostListener
} from '@angular/core';
import { XLinkPrefix, XLinkType } from './link.type';
import { XInputBoolean, XClassMap } from '@ng-nest/ui/core';

@Component({
  selector: `${XLinkPrefix}`,
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XLinkComponent implements OnInit {
  @Input() href?: string;
  @Input() icon?: string;
  @Input() @XInputBoolean() underline: boolean;
  @Input() @XInputBoolean() disabled?: boolean;
  @Input('icon-right') @XInputBoolean() iconRight?: boolean;
  @Input() type?: XLinkType;
  @Input() target?: string;
  @ViewChild('link', { static: true }) link: ElementRef;
  hover: boolean = false;
  mapClass: XClassMap = {};

  @HostListener('mouseenter') mouseenter() {
    this.hover = true;
    this.cdr.detectChanges();
  }

  @HostListener('mouseleave') mouseleave() {
    this.hover = false;
    this.cdr.detectChanges();
  }

  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setMapClass();
  }

  setMapClass() {
    this.mapClass[`${XLinkPrefix}-${this.type}`] = this.type ? true : false;
  }
}
