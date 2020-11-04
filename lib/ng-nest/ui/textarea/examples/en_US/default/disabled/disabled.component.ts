import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss']
})
export class ExDisabledComponent implements OnInit {
  model = 'input disabled';
  modelClearable = 'the clear button is not display in the disabled state';
  constructor() {}

  ngOnInit() {}
}
