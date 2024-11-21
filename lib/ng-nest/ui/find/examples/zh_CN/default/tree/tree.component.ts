import { Component, signal } from '@angular/core';
import { TreeService } from './tree.service';
import { XFindComponent } from '@ng-nest/ui/find';
import { FormsModule } from '@angular/forms';
import type { XTableRow } from '@ng-nest/ui/table';

@Component({
  selector: 'ex-tree',
  imports: [FormsModule, XFindComponent],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeService]
})
export class ExTreeComponent {
  model = signal<XTableRow | null>(null);
  modelMultiple = signal<XTableRow[]>([]);
  constructor(public treeService: TreeService) {}
}
