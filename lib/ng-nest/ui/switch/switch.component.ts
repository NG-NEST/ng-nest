import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  ElementRef,
  ViewChild
} from '@angular/core';
import { XSwitchProperty, XSwitchPrefix } from './switch.property';
import { XValueAccessor } from '@ng-nest/ui/core';

@Component({
  selector: `${XSwitchPrefix}`,
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [XValueAccessor(XSwitchComponent)]
})
export class XSwitchComponent extends XSwitchProperty implements OnInit {
  @ViewChild('switch', { static: true }) switch: ElementRef;

  writeValue(value: any) {
    this.value = value;
    this.cdr.detectChanges();
  }

  constructor(public renderer: Renderer2, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit() {
    this.setFlex(this.switch.nativeElement, this.renderer, this.justify, this.align, this.direction);
  }

  switchClick() {
    if (this.disabled) return;
    this.value = !this.value;
    if (this.onChange) this.onChange(this.value);
    this.cdr.detectChanges();
  }
}
