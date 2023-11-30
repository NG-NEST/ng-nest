import { Component } from '@angular/core';
import { XMenuComponent } from '@ng-nest/ui/menu';

@Component({
  selector: 'ex-size',
  standalone: true,
  imports: [XMenuComponent],
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class ExSizeComponent {
  data = [
    { id: 1, label: 'latest events', icon: 'fto-gift' },
    { id: 2, label: 'product', icon: 'fto-package' },
    { id: 3, label: 'solution', icon: 'fto-layers' },
    { id: 4, label: 'help and support', icon: 'fto-phone' },
    { id: 5, pid: 2, label: 'cloud foundation' },
    { id: 6, pid: 2, label: 'smart big data' },
    { id: 7, pid: 2, label: 'industry application' },
    { id: 8, pid: 2, label: 'blockchain' },
    { id: 9, pid: 2, label: 'proprietary cloud' },
    { id: 10, pid: 5, label: 'calculation' },
    { id: 11, pid: 5, label: 'internet' },
    { id: 12, pid: 5, label: 'storage' },
    { id: 13, pid: 5, label: 'database' }
  ];
}
