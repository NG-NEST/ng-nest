import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, TemplateRef, ViewEncapsulation, input, HostBinding } from '@angular/core';
import { XBoolean, XToBoolean } from '@ng-nest/ui/core';

@Component({
  selector: 'x-tab-content',
  preserveWhitespaces: false,
  standalone: true,
  imports: [NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tab-content.component.html'
})
export class XTabContentComponent {
  content = input<TemplateRef<any>>();
  active = input<boolean, XBoolean>(false, { transform: XToBoolean });

  @HostBinding('class.x-tab-content') _has = true;
}
