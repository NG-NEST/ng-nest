import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent implements OnInit {
  model = '#409eff';
  constructor() {}

  ngOnInit() {}
}
