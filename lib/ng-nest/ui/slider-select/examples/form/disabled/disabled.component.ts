import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent implements OnInit {
  model1 = 0;
  model2 = 60;
  constructor() {}

  ngOnInit() {}
}
