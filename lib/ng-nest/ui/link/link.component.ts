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
import { XLinkPrefix, XLinkType } from './link.type';
import { XInputBoolean, XTemplate } from '@ng-nest/ui/core';

@Component({
  selector: `${XLinkPrefix}`,
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XLinkComponent implements OnInit {
  @Input() label?: XTemplate;
  @Input() href?: string;
  @Input() icon?: string;
  @Input() @XInputBoolean() underline: boolean;
  @Input() @XInputBoolean() disabled?: boolean;
  @Input() @XInputBoolean() iconRight?: boolean;
  @Input() type?: XLinkType;
  @Input() target?: string;
  @ViewChild('link', { static: true }) link: ElementRef;
  constructor(public renderer: Renderer2, public elementRef: ElementRef, public cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.setType();
  }

  setType() {
    if (this.type) {
      this.renderer.addClass(this.link.nativeElement, `${XLinkPrefix}-${this.type}`);
    }
  }
}
