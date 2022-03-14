import {
  Component,
  OnInit,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import { XTagPrefix, XTagProperty } from './tag.property';
import { XIsEmpty, XConfigService, XIsChange, XClearClass } from '@ng-nest/ui/core';

@Component({
  selector: `${XTagPrefix}`,
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XTagComponent extends XTagProperty implements OnInit {
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { type, size, dark } = changes;
    XIsChange(type, size, dark) && this.setClassMap();
  }

  setClassMap() {
    XClearClass(this.classMap);
    this.classMap = {
      [`${XTagPrefix}-${this.type}`]: !XIsEmpty(this.type),
      [`${XTagPrefix}-${this.size}`]: !XIsEmpty(this.size),
      [`${XTagPrefix}-dark`]: Boolean(this.dark),
      [`${XTagPrefix}-checked`]: Boolean(this.checked)
    };
  }

  onClick() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  onClose() {
    if (this.disabled) return;
    this.close.emit();
  }
}
