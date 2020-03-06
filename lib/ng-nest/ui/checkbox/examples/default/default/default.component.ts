import { Component, OnInit } from '@angular/core';
import { XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent implements OnInit {
  data: XData<XCheckboxNode[]> = ['QQ', '微信', '钉钉', '微博'];
  model = ['微信'];
  constructor() {}

  ngOnInit() {}
}
