import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed } from '@angular/core';
import { XCardPrefix, XCardProperty } from './card.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: `${XCardPrefix}`,
  imports: [NgClass, NgStyle, XOutletDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCardComponent extends XCardProperty {
  classMap = computed(() => ({
    [`${XCardPrefix}-${this.shadow()}`]: !XIsEmpty(this.shadow())
  }));
}
