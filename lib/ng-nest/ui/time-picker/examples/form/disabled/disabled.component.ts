import { Component, OnInit } from '@angular/core';
import { XTimePickerNode } from '@ng-nest/ui/time-picker';
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
