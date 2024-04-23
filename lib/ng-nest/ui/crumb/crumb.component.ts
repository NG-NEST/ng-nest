import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { XCrumbPrefix, XCrumbNode, XCrumbProperty } from './crumb.property';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XOutletDirective } from '@ng-nest/ui/outlet';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: `${XCrumbPrefix}`,
  standalone: true,
  imports: [NgTemplateOutlet, XLinkComponent, XOutletDirective],
  templateUrl: './crumb.component.html',
  styleUrls: ['./style/index.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XCrumbComponent extends XCrumbProperty {
  action(type: string, option: XCrumbNode, event: Event) {
    switch (type) {
      case 'click':
        this.nodeClick.emit({
          event: event,
          node: option
        });
        break;
    }
  }
}
