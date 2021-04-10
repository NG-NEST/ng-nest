import { Component } from '@angular/core';
import { TreeService } from './tree.service';

@Component({
  selector: 'ex-tree',
  templateUrl: './tree.component.html',
  providers: [TreeService]
})
export class ExTreeComponent {
  model: any;
  modelMultiple: any = [];
  constructor(public treeService: TreeService) {}
}
