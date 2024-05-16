import { Component, signal } from '@angular/core';
import { XTabComponent, XTabsComponent } from '@ng-nest/ui/tabs';

@Component({
  selector: 'ex-expand',
  standalone: true,
  imports: [XTabsComponent, XTabComponent],
  templateUrl: './expand.component.html'
})
export class ExExpandComponent {
  labels = signal([
    'User Management',
    'Configuration management',
    'Role management',
    'Menu management',
    'organization',
    'authority management',
    'page design',
    'Workflow',
    'Form design',
    'Log view',
    'Message management',
    'Attribute design',
    'Process Design'
  ]);
}
