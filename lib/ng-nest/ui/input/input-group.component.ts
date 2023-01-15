import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { XConfigService } from '@ng-nest/ui/core';
import { XInputGroupPrefix, XInputGroupProperty } from './input.property';

@Component({
  selector: `${XInputGroupPrefix}`,
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XInputGroupComponent extends XInputGroupProperty {
  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef<HTMLElement>,
    public cdr: ChangeDetectorRef,
    public configService: XConfigService
  ) {
    super();
  }
}
