import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed } from '@angular/core';
import { XResultPrefix, XResultProperty } from './result.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { NgClass } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XResultPrefix}`,
  standalone: true,
  imports: [NgClass, XIconComponent, XOutletDirective],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XResultComponent extends XResultProperty {
  strIcon = computed(() => {
    return this.icon() as string;
  });

  classMapSignal = computed(() => ({
    [`${XResultPrefix}-${this.status()}`]: !XIsEmpty(this.status())
  }));
}
