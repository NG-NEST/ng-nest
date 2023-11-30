import { BooleanInput, coerceArray, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { Directive, InjectionToken, Input, OnDestroy } from '@angular/core';

export const X_LIST_DROP_GROUP = new InjectionToken<XListDropGroup>('XListDropGroup');

@Directive({
  selector: '[xListDropGroup]',
  standalone: true,
  providers: [{ provide: X_LIST_DROP_GROUP, useExisting: XListDropGroup }]
})
export class XListDropGroup implements OnDestroy {
  readonly dropLists = new Set<CdkDropList>();

  @Input('xListDropGroupDisabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  setConnectedTo() {
    this.dropLists.forEach((x) => {
      this.dropLists.forEach((y) => {
        if (!y.connectedTo) {
          y.connectedTo = [x];
        } else {
          if (!coerceArray(y.connectedTo).includes(x)) {
            coerceArray(y.connectedTo).push(x);
          }
        }
      });
    });
    console.log(this.dropLists);
  }

  ngOnDestroy() {
    this.dropLists.clear();
  }
}
