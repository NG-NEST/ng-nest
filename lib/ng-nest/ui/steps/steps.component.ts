import { Component, ViewEncapsulation, ChangeDetectionStrategy, computed } from '@angular/core';
import { XStepsPrefix, XStepsProperty } from './steps.property';
import { XIsUndefined, XIsNumber, XIsEmpty } from '@ng-nest/ui/core';
import { NgClass } from '@angular/common';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XOutletDirective } from '@ng-nest/ui/outlet';

@Component({
  selector: `${XStepsPrefix}`,
  standalone: true,
  imports: [NgClass, XIconComponent, XOutletDirective],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XStepsComponent extends XStepsProperty {
  nodes = computed(() => {
    const data = this.data();
    const activatedIndex = this.activatedIndex();
    const status = this.status();
    const nodeStatus = this.nodeStatus();
    return data.map((x, index) => {
      if (nodeStatus) {
        if (XIsUndefined(x.status)) {
          x.status = 'wait';
        }
      } else {
        if (XIsUndefined(activatedIndex)) {
          x.status = 'wait';
        } else if (XIsNumber(activatedIndex)) {
          x.status = index < activatedIndex ? 'finish' : index === activatedIndex ? 'process' : 'wait';
        }
        if (status && index === activatedIndex) x.status = status;
      }

      return x;
    });
  });

  classMapSignal = computed(() => ({
    [`${XStepsPrefix}-${this.layout()}`]: !XIsEmpty(this.layout())
  }));

  getIndex(index: number) {
    return this.startIndex() + index + 1;
  }
}
