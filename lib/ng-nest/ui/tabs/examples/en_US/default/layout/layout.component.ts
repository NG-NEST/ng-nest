import { Component } from '@angular/core';
import { XTabComponent, XTabsComponent, XTabsLayout } from '@ng-nest/ui/tabs';
import { XJustify } from '@ng-nest/ui/core';
import { CommonModule } from '@angular/common';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, XTabsComponent, XTabComponent, XRadioComponent],
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
