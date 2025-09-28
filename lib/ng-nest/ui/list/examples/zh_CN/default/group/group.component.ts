import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XListComponent } from '@ng-nest/ui/list';

@Component({
  selector: 'ex-group',
  imports: [FormsModule, XIconComponent, XListComponent],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class ExGroupComponent {
  data1 = signal([
    { label: 'AAAA1', group: 'group1' },
    { label: 'BBBB1', group: 'group1' },
    { label: 'CCCC1', group: 'group2' },
    { label: 'DDDD1', group: 'group2' },
    { label: 'EEEE1', group: 'group3' },
    { label: 'FFFF1', group: 'group3' }
  ]);

  model1 = signal('AAAA1');

  data2 = signal([
    { label: 'AAAA1', group: 'group1' },
    { label: 'BBBB1', group: 'group1' },
    { label: 'CCCC1', group: 'group2' },
    { label: 'DDDD1', group: 'group2' },
    { label: 'EEEE1', group: 'group3' },
    { label: 'FFFF1', group: 'group3' }
  ]);

  model2 = signal('AAAA1');
}
