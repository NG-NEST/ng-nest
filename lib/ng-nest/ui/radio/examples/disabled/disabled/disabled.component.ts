import { Component, OnInit } from '@angular/core';
import { XRadioNode } from '@ng-nest/ui/radio';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent implements OnInit {
  data: XData<XRadioNode[]> = ['QQ', '微信', '钉钉', '微博'];
  dataDisabled: XData<XRadioNode[]> = ['QQ', '微信', { label: '钉钉', disabled: true }, '微博'];
  model = '钉钉';
  constructor() {}

  ngOnInit() {}
}
