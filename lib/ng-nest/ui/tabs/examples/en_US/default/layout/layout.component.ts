import { Component } from '@angular/core';
import { XTabsLayout } from '@ng-nest/ui/tabs';
import { XJustify } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class ExLayoutComponent {
  labels = ['User Management', 'Configuration Management', 'Role Management', 'Tasks'];
  layoutRadios = ['top', 'right', 'bottom', 'left'];
  layout: XTabsLayout = 'top';
  justifyRadios = ['start', 'center', 'end'];
  justify: XJustify = 'start';
}
