import { Component, OnInit } from '@angular/core';
import { XSelectNode } from '@ng-nest/ui/select';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent implements OnInit {
  data: XData<XSelectNode[]> = ['AAAA', 'BBBB', 'CCCC', 'DDDD', 'EEEE', 'FFFF', 'GGGG', 'HHHH', 'IIII', 'JJJJ'];
  model = 'CCCC';
  constructor() {}

  ngOnInit() {}
}
