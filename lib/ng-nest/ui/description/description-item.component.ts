import { Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { XDescriptionItemPrefix, XDescriptionItemProperty } from './description.property';
import { CommonModule } from '@angular/common';

@Component({
  selector: `${XDescriptionItemPrefix}`,
  standalone: true,
  imports: [CommonModule],
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
  @ViewChild(TemplateRef, { static: true }) content!: TemplateRef<void>;
}
