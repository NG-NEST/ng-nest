import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed, contentChildren } from '@angular/core';
import { XDescriptionPrefix, XDescriptionProperty } from './description.property';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XDescriptionItemComponent } from './description-item.component';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: `${XDescriptionPrefix}`,
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, XOutletDirective],
  templateUrl: './description.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDescriptionComponent extends XDescriptionProperty {
  items = contentChildren(XDescriptionItemComponent);

  classMap = computed(() => ({
    [`${XDescriptionPrefix}-${this.size()}`]: !XIsEmpty(this.size())
  }));

  gridTemplateColumnsSignal = computed(() => {
    let gridTemplateColumns = this.gridTemplateColumns();
    if (gridTemplateColumns) return gridTemplateColumns;
    const columns: string[] = [];
    this.items().forEach((x) => {
      if (x.width) {
        columns.push(x.width());
      } else if (x.flex) {
        columns.push(`${x.flex()}fr`);
      }
    });
    return columns.join(' ');
  });

  setFlex(item: XDescriptionItemComponent) {
    let classes: { [property: string]: boolean } = {};
    if (!XIsEmpty(item.justify())) classes[`x-justify-${item.justify()}`] = true;
    if (!XIsEmpty(item.align())) classes[`x-align-${item.align()}`] = true;
    if (!XIsEmpty(item.direction())) classes[`x-direction-${item.direction()}`] = true;
    return classes;
  }
}
