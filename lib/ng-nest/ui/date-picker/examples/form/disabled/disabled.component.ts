import { Component, OnInit } from '@angular/core';
import { XDatePickerNode } from '@ng-nest/ui/date-picker';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent implements OnInit {
  model = new Date();
  constructor() {}

  ngOnInit() {}
}
