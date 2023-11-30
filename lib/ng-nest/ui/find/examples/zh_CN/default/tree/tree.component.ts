import { Component } from '@angular/core';
import { TreeService } from './tree.service';
import { XFindComponent } from '@ng-nest/ui/find';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ex-tree',
  standalone: true,
  imports: [FormsModule, XFindComponent],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  providers: [TreeService]
})
export class ExTreeComponent {
  model: any;
  modelMultiple: any = [];
  constructor(public treeService: TreeService) {}
}
