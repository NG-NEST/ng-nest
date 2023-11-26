import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { XCheckboxComponent, XCheckboxNode } from '@ng-nest/ui/checkbox';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-button',
  standalone: true,
  imports: [FormsModule, XCheckboxComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ExButtonComponent implements OnInit {
  data: XData<XCheckboxNode> = ['QQ', 'WeChat', 'DingTalk', 'Weibo'];
  dataDisabled: XData<XCheckboxNode> = ['QQ', 'WeChat', { label: 'DingTalk', disabled: true }, 'Weibo'];
  model = ['DingTalk'];
  constructor() {}

  ngOnInit() {}
}
