import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed } from '@angular/core';
import { XCardPrefix, XCardProperty } from './card.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: `${XCardPrefix}`,
  standalone: true,
  imports: [NgClass, NgStyle, XIconComponent, XOutletDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCardComponent extends XCardProperty {
  classMapSignal = computed(() => ({
    [`${XCardPrefix}-${this.shadow}`]: !XIsEmpty(this.shadow)
  }));
}
