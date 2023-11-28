import { Component } from '@angular/core';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDropdownComponent } from '@ng-nest/ui/dropdown';

@Component({
  selector: 'ex-multistage',
  standalone: true,
  imports: [XDropdownComponent, XButtonComponent],
  templateUrl: './multistage.component.html'
})
export class ExMultistageComponent {
  data = [
    { id: 1, label: 'AAAAA' },
    { id: 2, label: 'BBBBB' },
    { id: 3, label: 'CCCCC' },
    { id: 4, label: 'DDDDD' },
    { id: 5, label: 'EEEEE' },
    { id: 6, pid: 2, label: 'BBBBB-1' },
    { id: 7, pid: 2, label: 'BBBBB-2' },
    { id: 8, pid: 2, label: 'BBBBB-3' },
    { id: 9, pid: 2, label: 'BBBBB-4' },
    { id: 10, pid: 7, label: 'BBBBB-2-1' },
    { id: 11, pid: 7, label: 'BBBBB-2-2' },
    { id: 12, pid: 8, label: 'BBBBB-3-1' },
    { id: 13, pid: 8, label: 'BBBBB-3-2' },
    { id: 14, pid: 3, label: 'CCCCC-1' },
    { id: 16, pid: 3, label: 'CCCCC-2' },
    { id: 17, pid: 3, label: 'CCCCC-3' },
    { id: 18, pid: 3, label: 'CCCCC-4' },
    { id: 19, pid: 16, label: 'CCCCC-2-1' },
    { id: 20, pid: 16, label: 'CCCCC-2-2' },
    { id: 21, pid: 17, label: 'CCCCC-3-1' },
    { id: 22, pid: 17, label: 'CCCCC-3-2' }
  ];
}
