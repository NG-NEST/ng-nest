import { Component, signal } from '@angular/core';
import { XTabComponent, XTabsComponent, XTabsLayout } from '@ng-nest/ui/tabs';
import { XJustify } from '@ng-nest/ui/core';
import { XRadioComponent } from '@ng-nest/ui/radio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-layout',
  standalone: true,
  imports: [FormsModule, XTabsComponent, XTabComponent, XRadioComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class ExLayoutComponent {
  labels = signal(['User Management', 'Configuration Management', 'Role Management', 'Tasks']);
  layoutRadios = signal(['top', 'right', 'bottom', 'left']);
  layout = signal<XTabsLayout>('top');
  justifyRadios = signal(['start', 'center', 'end']);
  justify = signal<XJustify>('start');
}
