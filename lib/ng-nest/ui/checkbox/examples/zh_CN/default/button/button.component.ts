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
  data: XData<XCheckboxNode> = ['QQ', '微信', '钉钉', '微博'];
  dataDisabled: XData<XCheckboxNode> = ['QQ', '微信', { label: '钉钉', disabled: true }, '微博'];
  model = ['钉钉'];
  constructor() {}

  ngOnInit() {}
}
