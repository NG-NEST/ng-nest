import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XListComponent } from '@ng-nest/ui/list';

@Component({
  selector: 'ex-group',
  imports: [FormsModule, XListComponent],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class ExGroupComponent {
  data = signal([
    { label: 'AAAA1', group: 'group1' },
    { label: 'BBBB1', group: 'group1' },
    { label: 'CCCC1', group: 'group2' },
    { label: 'DDDD1', group: 'group2' },
    { label: 'EEEE1', group: 'group3' },
    { label: 'FFFF1', group: 'group3' }
  ]);

  model = signal('');
}
