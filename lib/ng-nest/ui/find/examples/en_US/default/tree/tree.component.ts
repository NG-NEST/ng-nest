import { Component } from '@angular/core';
import { TreeServiceTest } from './tree.service';

@Component({
  selector: 'ex-tree',
  templateUrl: './tree.component.html',
  providers: [TreeServiceTest]
})
export class ExTreeComponent {
  model: any;
  modelMultiple: any = [];
  constructor(public treeService: TreeServiceTest) {}
}
