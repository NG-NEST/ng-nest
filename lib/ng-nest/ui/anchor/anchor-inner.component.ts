import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { XAnchorInnerPrefix, XAnchorInnerProperty } from './anchor.property';

@Component({
  selector: `${XAnchorInnerPrefix}`,
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAnchorInnerComponent extends XAnchorInnerProperty {}
