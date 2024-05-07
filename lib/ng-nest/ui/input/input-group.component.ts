import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, inject } from '@angular/core';
import { XInputGroupPrefix, XInputGroupProperty } from './input.property';

@Component({
  selector: `${XInputGroupPrefix}`,
  standalone: true,
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XInputGroupComponent extends XInputGroupProperty {
  elementRef = inject(ElementRef);
}
