import { coerceArray } from '@angular/cdk/coercion';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { Directive, InjectionToken, OnDestroy, input } from '@angular/core';
import { XBoolean, XToBoolean } from '@ng-nest/ui/core';

export const X_LIST_DROP_GROUP = new InjectionToken<XListDropGroup>('XListDropGroup');

@Directive({
  selector: '[xListDropGroup]',
  providers: [{ provide: X_LIST_DROP_GROUP, useExisting: XListDropGroup }]
})
export class XListDropGroup implements OnDestroy {
  readonly dropLists = new Set<CdkDropList>();

  disabled = input<boolean, XBoolean>(false, { transform: XToBoolean, alias: 'xListDropGroupDisabled' });

  setConnectedTo() {
    this.dropLists.forEach((x) => {
      this.dropLists.forEach((y) => {
        const { connectedTo } = y;
        if (Array.isArray(connectedTo) && connectedTo.length === 0) {
          y.connectedTo = [x];
        } else {
          if (!coerceArray(y.connectedTo).includes(x)) {
            coerceArray(y.connectedTo).push(x);
          }
        }
      });
    });
  }

  ngOnDestroy() {
    this.dropLists.clear();
  }
}
