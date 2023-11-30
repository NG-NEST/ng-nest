import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { XConfigService } from '@ng-nest/ui/core';
import { XInputGroupPrefix, XInputGroupProperty } from './input.property';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XInputGroupPrefix}`,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XInputGroupComponent extends XInputGroupProperty {
  configService = inject(XConfigService);
  elementRef = inject(ElementRef);
}
