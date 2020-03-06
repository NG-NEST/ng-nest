import { Component, OnInit } from '@angular/core';
import { XDatePickerNode } from '@ng-nest/ui/date-picker';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class ExDefaultComponent implements OnInit {
  model1: any;
  model2 = new Date();
  constructor() {}

  ngOnInit() {}
}
