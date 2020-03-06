import { Component, OnInit } from '@angular/core';
import { XTimePickerNode } from '@ng-nest/ui/time-picker';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'ex-required',
  templateUrl: './required.component.html',
  styleUrls: ['./required.component.scss']
})
export class ExRequiredComponent implements OnInit {
  model: any;
  constructor() {}

  ngOnInit() {}
}
