import { Component, ViewEncapsulation, ChangeDetectionStrategy, TemplateRef, viewChild } from '@angular/core';
import { XDescriptionItemPrefix, XDescriptionItemProperty } from './description.property';

@Component({
  selector: `${XDescriptionItemPrefix}`,
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XDescriptionItemComponent extends XDescriptionItemProperty {
  content = viewChild.required(TemplateRef);
}
